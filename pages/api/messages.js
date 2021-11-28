import { createMessage, getAllMessages } from "../../lib/messages.js";

export default async function messages(req, res) {
    if (req.method === 'POST') {
        try {
            console.log ("All messages::" , req.body.text)
            const message = await createMessage(req.body.text, req.body.userId, req.body.username, req.body.topicId, req.body.createdAt, req.body.dpLink);
            if (message) {
                res.status(200).send({ message: message })
            }
            
        }
        catch (error) {
            console.error(error)
            res.status(500).end(error.message)
        }
    }

    else if (req.method === 'GET') {
        console.log("METHOD TYPE:: GET",)
        try {
            const messages = await getAllMessages(req.query.topicId);
            if (messages) {
                res.status(200).send({ messages: messages })
            }
            return messages;
        }
        catch (error) {
            console.error(error)
            res.status(500).end(error.message)
        }
    }
}