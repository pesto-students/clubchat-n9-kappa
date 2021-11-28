import prisma from '../lib/prisma';
import { getTrendingTopics } from '../lib/user-topics';

export async function createTopic(topicName) {
    try {
        const topic = await prisma.topic.create({
            data: {
                name: topicName,
                description: 'discuss',
                isTrending: false,
            },
        });
        if(topic) {
             const trendingTopics = await getTrendingTopics();
             return trendingTopics;
        }
        return [];
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

export async function searchTopic(searchText) {
    try {
      const topics = await prisma.topic.findMany({
        where: {
              name: {
                contains: searchText,
                mode: 'insensitive',
              },
          }
      });
      return topics;
    } catch (err) {
      console.log(err);
      return null;
    }
}