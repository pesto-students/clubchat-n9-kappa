import { setLoginSession } from '../../lib/auth'
import { findUser, loggedInUser } from '../../lib/user'
import { isTrue } from '../../lib/user'

export default async function login(req, res) {
  try {
    findUser(req.body.email, req.body.username, req.body.password)
    setTimeout((arg) => {
        if (isTrue) {
          try {
            const user = loggedInUser
            // session is the payload to save in the token, it may contain basic info about the user
            const session = { ...user }
      
            setLoginSession(res, session)
      
            res.status(200).send({ done: true })
          } catch (error) {
            console.error(error)
            res.status(401).send(error.message)
          }
        }
        else{
          res.status(401).send({error: 'Invalid Username or Password'})
        }
    }, 500);
    
  } catch (error) {
    console.error(error)
    res.status(500).end(error.message)
  }
}