import prisma from '../lib/prisma'
import { v4 as uuidv4 } from 'uuid'

export async function createMessage(text, userId, userName, topicId) {
    try {
        const message = await prisma.message.create({
            data: {
                id: uuidv4(),
                text: text,
                userId: userId,
                // username: userName,
                topicId: topicId,
            },
        });
        return message;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function getAllMessages(topicId) {
    try{
        const messages = await prisma.message.findMany({
            where: {
                topicId : topicId
            }
        });
        return messages;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}