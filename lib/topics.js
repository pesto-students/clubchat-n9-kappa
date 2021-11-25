import prisma from '../lib/prisma'
import { v4 as uuidv4 } from 'uuid'

export async function createTopic(topicName, topicDescription) {
    try {
        const topic = await prisma.topic.create({
            data: {
                name: topicName,
                description: topicDescription
            },
        });
        return topic;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export async function getAllTopics() {
    try {
      const topics = await prisma.topic.findMany();
      return topics;
    } catch (err) {
      console.log(err);
      return null;
    }
  }