import Product, { product } from "../../../models/Product"
import { Ok } from '../../../utils/server/commonError'
import { logHandler } from '../../../utils/server/commonHandler'
import { validateRequest } from "../../../utils/server/middleware"


async function sendByCategory(maxResults: number) {
    const categoryQuery = [{ "$group": { "_id": "category1", "categories": { "$addToSet": "$category1" } } }]
    const categories: String[] = (await Product.aggregate(categoryQuery).exec())[0]["categories"]
    const totalResult: product[] = []
    for (let category of categories) {
        const result = await Product.aggregate([{ "$match": { "category1": category } }, { "$sample": { "size": Math.floor(maxResults / categories.length) } }])
        totalResult.push(...result)
    }
    return totalResult
}


const handler = logHandler()
    .get(
        validateRequest([]),
        async (req, res) => {
            const { sort, display, byCategory, id: id } = req.query
            const maxResults = Math.min(100, parseInt(display ? display.toString() : "10"))
            if (byCategory === "true") {
                const totalResult = await sendByCategory(maxResults)
                Ok(res, totalResult)
            } else {
                let result
                if (id) {
                    result = await Product.aggregate([{ "$match": { id: parseInt(id as string) } }, { "$sample": { "size": maxResults } }])
                } else {
                    result = await Product.aggregate([{ "$sample": { "size": maxResults } }])
                }
                Ok(res, result)
            }
        }

    )

export default handler