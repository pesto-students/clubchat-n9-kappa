import { updateDPinMessages, updateUserProfileDP } from '../../lib/user'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const result = await updateUserProfileDP(req.body.params.query.userId, req.body.params.query.avatar);
            await updateDPinMessages(req.body.params.query.username, req.body.params.query.avatar)
            res.status(200).send({ result })
        } catch (error){
            console.error(error)
            res.status(500).send(error)
        }
    }
}