import { getLoginSession } from '../../lib/auth'
import { getActiveUser, updateMaxAge } from '../../lib/user'

export default async function user(req, res) {
  try {
    const session = await getLoginSession(req)
    if (session != undefined)
      updateMaxAge(session);
    const user = (session && (await getActiveUser(session))) ?? null
    res.status(200).json({ user })
  } catch (error) {
    console.error(error)
    res.status(500).end('Authentication token is invalid, please log in')
  }
}
