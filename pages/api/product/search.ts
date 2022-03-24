import Product, { product } from "../../../models/Product"
import dbCheckConnect from '../../../utils/dbCheckConnect'
import { Err, Ok } from '../../../utils/commonError'
import commonHandler, { validate, validateRequest } from '../../../utils/commonHandler'
import nc from "next-connect"

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
const handler = nc(commonHandler)
    .get(
        validateRequest(),
        async (req, res) => {
            dbCheckConnect()
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