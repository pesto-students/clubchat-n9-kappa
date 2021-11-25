import { getUserProfile } from '../../lib/user'

export default async function handler(req, res) {
    if (req.method === 'GET') {
        console.log("REQ", req.query.query);
        try {
            const result = await getUserProfile(req.query.query);
            res.status(200).send({ result })
        } catch (error){
            console.error(error)
            res.status(500).send(error)
        }
    }
}
