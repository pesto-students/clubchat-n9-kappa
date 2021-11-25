import { createUser, updatePassword } from '../../lib/user'
import { findUser } from '../../lib/user'
import { isTrue } from '../../lib/user'

export default async function resetPassword(req, res) {
  try {
    findUser(req.body.email, "", "")
    setTimeout((arg) => {
      if (req.body.email.includes('@')) {
        // await findUser(req.body.username)
        if (isTrue) {
            updatePassword(req.body.email, req.body.password)
            res.status(200).send({ done: true })
        }
        else{
            res.status(401).send({error: 'Could not find user'})
        }
        
      }
      else {
        res.status(401).send({error:'invalied email'})
      }
    }, 500);
    
  } catch (error) {
    console.error(error)
    res.status(500).end(error.message)
  }
}
