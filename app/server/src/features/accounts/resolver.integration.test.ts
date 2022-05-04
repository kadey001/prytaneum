import bcrypt from 'bcryptjs';
import { getOrCreateServer } from '@local/core/server';
import { getPrismaClient } from '@local/core/utils';
import { createMercuriusTestClient } from 'mercurius-integration-testing';
import * as plugins from '@local/core/plugins';
import { redisEmitter } from '@local/core/plugins/mercurius';
import * as jwt from '@local/lib/jwt';
import { toGlobalId } from '../utils';

const server = getOrCreateServer();
const testClient = createMercuriusTestClient(server);
const prisma = getPrismaClient(server.log);

const toUserId = toGlobalId('User');

const userData = {
    id: '4136cd0b-d90b-4af7-b485-5d1ded8db252',
    email: 'sallySmith@test.com',
    firstName: 'Sally',
    lastName: 'Smith',
    password: 'testPassword',
    preferredLang: 'EN',
};

beforeAll(async () => {
    plugins.attachCookieTo(server);
    plugins.attachMercuriusTo(server);
    const encryptedPassword = await bcrypt.hash(userData.password, 10);
    await prisma.user.create({
        data: {
            ...userData,
            password: encryptedPassword,
        },
    });
});

afterAll(async () => {
    await prisma.user.delete({
        where: {
            id: userData.id,
        },
    });
    await prisma.$disconnect();
    redisEmitter.close(() => {});
    await server.close();
});

describe('Account resolvers', () => {
    test('[me] query with no cookie should return null', async () => {
        const queryResponse = await testClient.query('query { me { id } }');
        expect(queryResponse.data).toEqual({ me: null });
    });
    test('[me] query with non-existing account cookie should return null', async () => {
        const token = await jwt.sign({ id: '' });
        testClient.setCookies({ jwt: token });

        const queryResponse = await testClient.query('query { me { id } }');
        expect(queryResponse.data).toEqual({ me: null });
    });
    test('[me] query with existing account cookie should return user id', async () => {
        const user = toUserId(userData);
        const token = await jwt.sign({ id: user.id });
        testClient.setCookies({ jwt: token });

        const queryResponse = await testClient.query('query { me { id } }');
        expect(queryResponse.data).toEqual({ me: { id: user.id } });
    });
});
