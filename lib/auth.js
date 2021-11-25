import jwt from 'jsonwebtoken'
import { MAX_AGE, setTokenCookie, getTokenCookie } from './auth-cookies'

const TOKEN_SECRET = "this-is-a-secret-value-with-at-least-32-characters";

export async function setLoginSession(res, session) {
  const createdAt = Date.now()
  // Create a session object with a max age that we can validate later
  const obj = { ...session, createdAt, maxAge: MAX_AGE }
  const token = jwt.sign(obj, TOKEN_SECRET)
  setTokenCookie(res, token)
}

export async function getLoginSession(req) {
  const token = getTokenCookie(req)

  if (!token) return

  const session = jwt.verify(token, TOKEN_SECRET)

  const expiresAt = session.createdAt + session.maxAge * 1000
  
  // Validate the expiration date of the session
  if (Date.now() > expiresAt) {
    throw new Error('Session expired')
  }

  return session
}
