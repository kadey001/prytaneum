/* eslint-disable @typescript-eslint/indent */
// import { Resolvers as IResolvers } from '@local/graphql-types';
import mercurius, { IResolvers } from 'mercurius';
import * as Relay from 'graphql-relay';
import type { Node, ResolversParentTypes, MutationResponse, Maybe } from '@local/graphql-types';
import { getOrCreateServer } from '@local/core/server';
import { ProtectedError } from '@local/lib/ProtectedError';
import type { Redis, Cluster } from 'ioredis';
import { DEFAULT_LOCK_TIMEOUT } from '@local/lib/rules';
import {
    EventQuestion,
    EventQuestionTopic,
    EventQuestionTranslations,
    Prisma,
    PrismaClient,
} from '@local/__generated__/prisma';

/**
 * Resolver type used for making resolvers
 */
export type Resolvers = IResolvers;
export const { withFilter } = mercurius;

/**
 * common error messages
 */
export const errors = {
    /**
     * Error thrown if there is no user logged in
     */
    noLogin: 'Must be logged in',
    /**
     * Error thrown if there are invalid arguments
     */
    invalidArgs: 'Missing arguments', // TODO: should be handled by joi to tell what arguments are missing
    /**
     * Error thrown if something doesn't exist
     * @arg thing the "thing" that doesn't exist as a string ex. "User does not exist"
     */
    DNE: (thing: string) => `${thing} does not exist!`,
    /**
     * Error thrown if there are insufficient permissions
     */
    permissions: 'Insufficient permissions',
    fileNotFound: 'File not found',
    fileSize: 'File too large',
    email: 'Emailed failed to send due to an unexpected error',
    jwt: 'Invalid Token',
    muted: 'You are muted and cannot perform this action',
    unexpected: 'An unexpected error occurred, please try again later',
};
interface TFilterFieldArgs<TObj extends Record<string, unknown>, TKeys extends keyof TObj> {
    input: TObj;
    allowedFields: Record<TKeys, true>;
}

type TDefinedFields<TObj extends Record<string, unknown>> = {
    [Key in keyof TObj]: NonNullable<TObj[Key]>;
};
/**
 * ### Description
 * - `input` is an object to trim/filter
 * - `allowedFields` is a map consisting of keys possibly present in `input` and the boolean value `true`.  A whitelist is better
 * to maintain than a blacklist.  If using a blacklist, a scenario where you add sensitive information and forget to update the blacklist
 * is likely to happen and the "failure" is much worse than when using a whitelist.  When using a whitelist, the possible failure is that
 * the client does not get all of the data it needs, which is a simple bug to fix -- not a big deal.
 *
 * The result of this function is an object whose keys are the intersection of keys from `input` and `allowedFields`, and at
 * the same time trimming keys that are null or undefined within the `input` object.
 */
export function filterFields<TObj extends Record<string, unknown>, TKeys extends keyof TObj>({
    input,
    allowedFields,
}: TFilterFieldArgs<TObj, TKeys>): TDefinedFields<Pick<TObj, TKeys>> {
    return (
        // make entries based on allowedFields
        Object.entries(allowedFields)
            // create an entry array where each element is a 2 array tuple or an array of length 0 if input[key] is undefined or null
            .map(([key]) => (input[key] !== null && input[key] !== undefined ? ([key, input[key]] as const) : []))
            // trim every entry with length 0 -- input[key] was undefined or null
            .filter((entry) => entry.length !== 0)
            // build the object back up using each [key, value] tuple entry
            .reduce((accum, [k, v]) => ({ ...accum, [k]: v }), {}) as unknown as TDefinedFields<Pick<TObj, TKeys>>
    );
}

/**
 * Curried function for converting all objects to a global id
 * ```ts
 * const toFooId = toGlobalId('Foo'); // Assuming Foo is some graphql type
 * // ...
 * const formattedFoo = toFooId(someFooObj);
 * ```
 */
export function toGlobalId(type: NonNullable<ResolversParentTypes['Node']['__typename']>) {
    return <T extends Node | null>(obj: T): T => {
        if (obj === null) return obj;
        const id = Relay.toGlobalId(type, obj.id);
        return { ...obj, id };
    };
}

type TCallback<TReturn> = () => Promise<TReturn> | TReturn;
type TRunMutationReturn<TReturn> = Promise<MutationResponse & { body: Maybe<TReturn> }>;
export async function runMutation<TReturn>(cb: TCallback<TReturn>): TRunMutationReturn<TReturn> {
    try {
        const result = await cb();
        return {
            isError: false,
            message: '',
            body: result,
        };
    } catch (e) {
        if (e instanceof ProtectedError) {
            // Display internal message if one exists, otherwise just display uesrMessage
            getOrCreateServer().log.error(e.internalMessage === '' ? e.userMessage : e.internalMessage);
            return {
                isError: true,
                message: e.userMessage,
                body: null,
            };
        }
        getOrCreateServer().log.error(`Error is not an instance of ProtectedError! Error: ${JSON.stringify(e)}}`);
        return {
            isError: true,
            message: 'Internal server error. Please try again.',
            body: null,
        };
    }
}

export async function checkForRedisLock(redis: Redis | Cluster, key: string) {
    const server = getOrCreateServer();
    server.log.debug(`Checking for Lock: ${key}...`);
    const result = await redis.get(key);
    server.log.debug(result ? `Lock: ${key} found` : `Lock: ${key} not found`);
    return result === 'true';
}

export interface LockOptions {
    lockTimeout?: number;
    acquireTimeout: number;
    acquireAttemptsLimit: number;
    retryInterval: number;
}

// Attempts to acquire a semaphore lock using redis
// Returns true if lock was acquired successfully, false otherwise
export async function tryAquireRedisLock(redis: Redis | Cluster, key: string, options: LockOptions) {
    const server = getOrCreateServer();
    let attempts = 0;
    const endTime = Date.now() + options.acquireTimeout;

    server.log.debug(`Attempting to acquire lock for key: ${key}...`);
    while (attempts < options.acquireAttemptsLimit && Date.now() < endTime) {
        const result = await redis.set(key, 'true', 'EX', options.lockTimeout || DEFAULT_LOCK_TIMEOUT, 'NX');
        if (result === 'OK') {
            server.log.debug(`Lock: ${key} acquired`);
            return true;
        }
        server.log.debug(`Failed to acquire lock for key: ${key}, retrying... Attempt: ${attempts + 1}`);
        attempts++;
        await new Promise((resolve) => setTimeout(resolve, options.retryInterval));
    }
    server.log.error(`Failed to acquire lock for key: ${key}, timeout reached.`);
    return false;
}

export async function releaseRedisLock(redis: Redis | Cluster, key: string) {
    const server = getOrCreateServer();
    server.log.debug(`Releasing Lock: ${key}...`);
    const result = await redis.del(key);
    server.log.debug(result ? `Lock: ${key} released` : `Lock: ${key} failed to release`);
}

/**
 * @description Get the user's preferred language from the database
 * @param userId
 * @param prisma
 * @returns string containing the user's preferred language
 * @default 'EN'
 */
export async function getPreferredLang(userId: string | null, prisma: PrismaClient) {
    // TODO: ability to choose language without being logged in, maybe using local storage that is passed along
    if (!userId) return 'EN'; // default to english if no user is logged in
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { preferredLang: true },
    });
    return user?.preferredLang || 'EN';
}

export type TEventQuestionWithTranslations = (EventQuestion & {
    topics?: EventQuestionTopic[];
    translations: EventQuestionTranslations | null;
})[];

type TQuestionTranslationProps = {
    questions: TEventQuestionWithTranslations;
    preferredLang: string;
};

// Get the question translation based on the user's preferred language
export function getQuestionTranslation({ questions, preferredLang }: TQuestionTranslationProps) {
    const result = questions.map((question) => {
        const translationsObject = question.translations?.questionTranslations as Prisma.JsonObject | undefined;
        if (!translationsObject) return question;
        const translation = translationsObject[preferredLang];
        if (!translation) return question;
        return { ...question, question: translation as string, translations: null };
    });
    return result;
}
