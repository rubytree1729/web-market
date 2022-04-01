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
            let { sort, display, byCategory, id, category1, category2 } = req.query
            const maxResults = Math.min(100, parseInt(display ? display.toString() : "10"))
            if (byCategory === "true") {
                const totalResult = await sendByCategory(maxResults)
                Ok(res, totalResult)
            } else {
                // simplify this!!!
                const parsedId = id ? parseInt(id.toString()) : id
                let result
                if (parsedId) {
                    result = await Product.aggregate([{ "$match": { id: parsedId } }, { "$sample": { "size": maxResults } }])
                } else if (category2) {
                    result = await Product.aggregate([{ "$match": { category2 } }, { "$sample": { "size": maxResults } }])
                    // console.log("caregory2", result)
                } else if (category1) {
                    result = await Product.aggregate([{ "$match": { category1 } }, { "$sample": { "size": maxResults } }])
                    // console.log("caregory1", result)
                } else {
                    result = await Product.aggregate([{ "$sample": { "size": maxResults } }])
                }
                Ok(res, result)
            }
        }
    )

export default handler