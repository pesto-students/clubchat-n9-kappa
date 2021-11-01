import { PrismaClient } from '.prisma/client';
import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'

/**
 * User methods. The example doesn't contain a DB, but for real applications you must use a
 * db here, such as MongoDB, Fauna, SQL, etc.
 */

const users = []
// const user = await prisma.users.findMany();
export var isTrue = false;
export var loggedInUser;
export var activeUser;
const prisma = new PrismaClient();

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

  console.log("UN new::", email, password, username);
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
  })
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
          console.log("USER found::", user);
        }
        else {
          isTrue = false;
          console.log("USER not found::", user);
        }
      }
      else {
        const user = await prisma.users.findUnique({
          where: {
            email: email,
          },
        })
        // const userPassword = await prisma.users.fin

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

  export async function getActiveUser (userSession) {
    console.log("USER session::", userSession);
    if (userSession) {
      activeUser = await prisma.users.findUnique({
        where: {
          email: userSession.email,
        },
      })
      console.log("Active user::", activeUser);
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

  // Compare the password of an already fetched user (using `findUser`) and compare the
  // password for a potential match
  export function validatePassword(user, inputPassword) {
    const inputHash = crypto
      .pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512')
      .toString('hex')
    const passwordsMatch = user.hash === inputHash
    return passwordsMatch
  }