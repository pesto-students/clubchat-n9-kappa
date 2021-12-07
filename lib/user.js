import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'
import prisma from '../lib/prisma'

/**
 * User methods. The example doesn't contain a DB, but for real applications you must use a
 * db here, such as MongoDB, Fauna, SQL, etc.
 */
const INITIAL_TOPIC = '028551f8-4f76-4ce5-aa14-f9cb5b94959f';
const users = []
// const user = await prisma.users.findMany();
export var isTrue = false;
export var loggedInUser;
export var activeUser;
// let prisma = new PrismaClient();

export async function createUser({ email, password, username }) {

  // Here you should create the user and save the salt and hashed password (some dbs may have
  // authentication methods that will do it for you so you don't have to worry about it):

  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex')
  const user = {
    id: uuidv4(),
    createdAt: Date.now(),
    email,
    hash,
    salt,
  }

  const newUser = await prisma.users.create({
    data: {
      id: user.id,
      email: email,
      hash: user.hash,
      salt: user.salt,
      username: username,
      maxage: 0,
      createdAt: user.createdAt
    },
  });

  if (newUser) {
    const avatar = ['avatar', 'avatar1', 'avatar2', 'avatar3', 'avatar4', 'avatar5', 'avatar6', 'avatar7', 'avatar8', 'avatar9', 'avatar']
    const newUserProfile = await prisma.profile.create({
      data: {
        profileId: user.id,
        totalChat: 0,
        totalTopicsFollowing: 0,
        topicsFollowing: '',
        dpLink: avatar[parseInt(Math.random() * 10)]
      },
    });
    const initialUsrTopic = await prisma.message.create({
      data: {
        userId: user.id,
        topicId: INITIAL_TOPIC,
      },
    });
  }
  return newUser
}

// Here you should lookup for the user in your DB
export async function findUser(email, username, password) {

  // This is an in memory store for users, there is no data persistence without a proper DB
  if (prisma) {
    if (password === "") {
      const userEmail = await prisma.users.findUnique({
        where: {
          email: email,
        },
      })

      const userName = await prisma.users.findUnique({
        where: {
          username: username,
        },
      })

      if (userEmail || userName) {
        isTrue = true;
        console.log("USER found::");
      }
      else {
        isTrue = false;
        console.log("USER not found::");
      }
    }
    else {
      const user = await prisma.users.findUnique({
        where: {
          email: email,
        },
      })
      // const userPassword = await prisma.users.fin
      console.log("USERSSSS", user);
      if (user) {
        if (validatePassword(user, password)) {
          isTrue = true;
          loggedInUser = user;
          console.log("USER should log in", user)
        }
        else {
          isTrue = false;
          console.log("USER should not log in", user)
        }
      }
      else {
        isTrue = false;
        console.log("USER should not log in", user)
      }
    }
  }
  else {
    isTrue = false;
  }
  return isTrue;
  // return users.find((user) => user.username === username)
}

export async function getActiveUser(userSession) {
  if (userSession) {
    activeUser = await prisma.users.findUnique({
      where: {
        email: userSession.email,
      },
    })
  }

  return activeUser;
}

export async function updateMaxAge(session) {
  await prisma.users.update({
    where: {
      id: session.id,
    },
    data: {
      maxage: session.maxAge,
    },
  })
}

export async function updatePassword(email, password) {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex')
  const user = {
    id: uuidv4(),
    createdAt: Date.now(),
    email,
    hash,
    salt,
  }
  await prisma.users.update({
    where: {
      email: email,
    },
    data: {
      hash: user.hash,
      salt: user.salt
    },
  })
}

// Compare the password of an already fetched user (using `findUser`) and compare the
// password for a potential match
export function validatePassword(user, inputPassword) {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512')
    .toString('hex')
  const passwordsMatch = user.hash === inputHash
  return passwordsMatch
}

export async function getUserProfile(userId) {
  const profile = await prisma.profile.findMany({
    where: {
      AND: [
        {
          profileId: {
            equals: userId,
          },
        },
      ]
    },
    take: 25,
    skip: 0,
    select: {
      userProfile: {
        select: {
          email: true,
          username: true,
          createdAt: true,
        }
      },
      profileId: true,
      totalChat: true,
      totalTopicsFollowing: true,
      topicsFollowing: true,
      dpLink: true,
    }
  });
  const tempProfile = profile[0];
  if (tempProfile) {
    const totalChat = await getTotalChat(tempProfile.userProfile.username);
    const totalTopicsFollowing = await getTotalTopicFollowing(tempProfile.profileId);
    const result = {
      ...tempProfile,
      totalChat,
      totalTopicsFollowing
    }
    return result;
  }
  return tempProfile;
}

export async function updateUserProfileDP(userId, avatar) {
  const result = await prisma.profile.update({
    where: {
      profileId: userId,
    },
    data: {
      dpLink: avatar,
    },
  });
  return result;
}

export async function updateDPinMessages(username, avatar) {
  const result = await prisma.message.updateMany({
    where: {
      userName: username
    },
    data: {
      dpLink: avatar
    }
  });
  return result;
}

async function getTotalChat(username) {
  const result = await prisma.message.findMany({
    where: {
      userName: username
    },
    select: {
      text: true
    }
  });
  return result.length;
}

async function getTotalTopicFollowing(userId) {
  const result = await prisma.usertopic.findMany({
    where: {
      userId: userId
    },
    select: {
      topicId: true
    }
  });
  return result.length;
}
