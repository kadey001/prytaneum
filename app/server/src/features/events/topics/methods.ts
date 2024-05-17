import axios from 'axios';
// import { PrismaClient } from '@local/__generated__/prisma';
import { ProtectedError } from '@local/lib/ProtectedError';
import { PrismaClient } from '@local/__generated__/prisma';

export async function getEventTopics(eventId: string, prisma: PrismaClient) {
    const topics = await prisma.eventTopic.findMany({
        where: { eventId },
        select: {
            id: true,
            eventId: true,
            topic: true,
            description: true,
        },
    });
    return topics;
}

export async function generateEventTopics(eventId: string, readingMaterials: string) {
    type ExpectedResponse = {
        issue: string;
        topics: { [key: string]: string };
    };
    const response = await axios.post(
        process.env.MODERATION_URL,
        {
            stage: 'extraction',
            reading_materials: readingMaterials,
            eventId: eventId,
            event_id: eventId,
        },
        {
            headers: { 'Content-Type': 'application/json' },
        }
    );
    const data = response.data as ExpectedResponse;
    console.log('DATA: ', data);
    if (!data.topics)
        throw new ProtectedError({
            userMessage: 'No topics found. Please try again.',
            internalMessage: `No topics found for event ${eventId} with reading materials ${readingMaterials.substring(
                0,
                100
            )}...`,
        });
    const topics = Object.keys(data.topics).map((key) => ({ topic: key, description: data.topics[key] }));
    return topics;
}

export async function regenerateEventTopics(eventId: string) {
    const response = await axios.post(
        process.env.MODERATION_URL,
        {
            stage: 'interactive',
            action: 'regenerate',
            eventId: eventId,
        },
        {
            headers: { 'Content-Type': 'application/json' },
        }
    );
    const data = response.data as { topics: { [key: string]: string }; locked_topics: string[] };
    console.log('DATA: ', data);
    if (!data.topics)
        throw new ProtectedError({
            userMessage: 'No topics found. Please try again.',
            internalMessage: `No topics found for event ${eventId}`,
        });
    const topics = Object.keys(data.topics).map((key) => ({
        topic: key,
        description: data.topics[key],
        locked: data.locked_topics.includes(key),
    }));
    return topics;
}

interface UpdateTopicProps {
    eventId: string;
    oldTopic: string;
    newTopic: string;
    description: string;
}

export async function updateTopic({ eventId, oldTopic, newTopic, description }: UpdateTopicProps) {
    console.log('Updating topic: ', { eventId, oldTopic, newTopic, description });

    const response = await axios.post(
        process.env.MODERATION_URL,
        {
            stage: 'interactive',
            action: 'rename',
            eventId: eventId,
            selected_topic: oldTopic,
            new_topic: newTopic,
            new_definition: description,
        },
        {
            headers: { 'Content-Type': 'application/json' },
        }
    );
    console.log('Response: ', response);
}

export async function deleteTopic(eventId: string, topic: string) {
    console.log('Deleting topic: ', { eventId, topic });

    const response = await axios.post(
        process.env.MODERATION_URL,
        {
            stage: 'interactive',
            action: 'remove',
            eventId: eventId,
            selected_topic: topic,
        },
        {
            headers: { 'Content-Type': 'application/json' },
        }
    );
    console.log('Response: ', response);
}

export async function addTopic(eventId: string, topic: string, description: string) {
    console.log('Adding topic: ', { eventId, topic, description });

    const response = await axios.post(
        process.env.MODERATION_URL,
        {
            stage: 'interactive',
            action: 'add',
            eventId: eventId,
            new_topic: topic,
            new_definition: description,
        },
        {
            headers: { 'Content-Type': 'application/json' },
        }
    );
    console.log('Response: ', response);
}

export async function lockTopic(eventId: string, topic: string) {
    console.log('Locking topic: ', { eventId, topic });

    try {
        const response = await axios.post(
            process.env.MODERATION_URL,
            {
                stage: 'interactive',
                action: 'lock',
                eventId: eventId,
                selected_topic: topic,
            },
            {
                headers: { 'Content-Type': 'application/json' },
            }
        );
        console.log('Response: ', response);
    } catch (error) {
        console.error(error);
        throw new ProtectedError({ userMessage: 'An error occurred while locking the topic' });
    }
}

export async function unlockTopic(eventId: string, topic: string) {
    console.log('Unlocking topic: ', { eventId, topic });

    const response = await axios.post(
        process.env.MODERATION_URL,
        {
            stage: 'interactive',
            action: 'unlock',
            eventId: eventId,
            selected_topic: topic,
        },
        {
            headers: { 'Content-Type': 'application/json' },
        }
    );
    console.log('Response: ', response);
}

export async function finalizeTopics(
    eventId: string,
    topics: { topic: string; description: string }[],
    prisma: PrismaClient
) {
    const result = await prisma.eventTopic.createMany({
        data: topics.map((topic) => ({ eventId, topic: topic.topic, description: topic.description })),
        skipDuplicates: true,
    });
    console.log('Result: ', result);
}
