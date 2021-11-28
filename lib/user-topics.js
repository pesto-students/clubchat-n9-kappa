import prisma from '../lib/prisma'

// const prisma = new PrismaClient();

export async function createUserTopic(userId, topicId) {
  try {
    const userTopic = await prisma.usertopic.create({
      data: {
        userId: userId,
        topicId: topicId
      },
    })
    return userTopic;
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

export async function getTrendingTopics() {
  try {
    const topics = await prisma.topic.findMany({
      where: {
        AND: [
          {
            isTrending: {
              equals: true,
            },
          },
        ]
      },
      take: 25,
      skip: 0,
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        isTrending: true,
        topics: true,
      }
    });
    return topics;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getUserTopics(userId) {
  try {
    const topics = await prisma.usertopic.findMany({
      where: {
        AND: [
          {
            userId: {
              equals: userId,
            },
          },
        ]
      },
      take: 25,
      skip: 0,
      select: {
        id: true,
        userId: true,
        topic: {
          select: {
            id: true,
            name: true,
            description: true,
            createdAt: true,
            isTrending: true,
          }
        },
      }
    });
    return topics;
  } catch (err) {
    console.log(err);
    return null;
  }
}