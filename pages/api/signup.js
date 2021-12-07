import { createUser } from '../../lib/user'
import { findUser } from '../../lib/user'
import { isTrue } from '../../lib/user'

export default async function signup(req, res) {
  try {
    findUser(req.body.email, req.body.username, "")
    setTimeout((arg) => {
      if (req.body.email.includes('@')) {
        // await findUser(req.body.username)
        if (isTrue) {
          res.status(401).send('Username or email already exists')
        }
        else{
          createUser(req.body)
          res.status(200).send({ done: true })
        }
        
      }
      else {
        res.status(401).send('invalied email')
      }
    }, 500);
    
  } catch (error) {
    console.error(error)
    res.status(500).end(error.message)
  }
}
