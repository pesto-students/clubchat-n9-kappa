import { searchTopic } from '../../lib/topics';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const result = await searchTopic(req.query.query);
            res.status(200).send({ result })
        } catch (error){
            console.error(error)
            res.status(500).send(error)
        }
    }
}