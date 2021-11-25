import { getAllTopics, createTopic } from "../../lib/topics"

export default async function topics(req, res) {
    if (req.method === 'GET') {
        try {
            // console.log ("All Topics::" , getAllTopics())
            const topics = await getAllTopics();
            res.status(200).send({ topics: topics })
        }
        catch (error) {
            console.error(error)
            res.status(500).end(error.message)
        }
    }
    else if (req.method === 'POST') {
        try {
            const topics = await createTopic('', '');
            if (topics) {
                res.status(200).send({ topics })
            }
            res.status(500).end({ error: "null is returned" });
        }
        catch (error) {
            console.error(error)
            res.status(500).end(error.message)
        }
    }
}
