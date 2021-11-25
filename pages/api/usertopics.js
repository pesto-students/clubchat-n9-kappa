import { createUserTopic, getUserTopics } from "../../lib/user-topics"

export default async function usertopics(req, res) {
    if (req.method === 'GET') {
        try {
            const result = await getUserTopics(req.query.query);
            res.status(200).send({ result })
        } catch (error) {
            console.error(error)
            res.status(500).send(error)
        }
    }
    else if (req.method === 'POST') {
        try {
            const response = await createUserTopic(req.body.params.query.userId, req.body.params.query.topicId);
            if (response) {
                const result = await getUserTopics(req.body.params.query.userId);
                res.status(200).send({ result })
            }
            res.status(200).send({ done: false })
        }
        catch (error) {
            console.error(error)
            res.status(500).send(error.message)
        }
    }
}