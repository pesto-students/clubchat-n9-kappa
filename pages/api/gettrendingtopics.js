import { getTrendingTopics } from "../../lib/user-topics"

export default async function gettrendingtopics(req, res) {
    const result = await getTrendingTopics();
    try {
        // console.log ("All Topics::" , getAllTopics())
        res.status(200).send({ result })
    }
    catch (error) {
        console.error(error)
        res.status(500).end(error.message)
      }
}