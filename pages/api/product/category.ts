import Product from "../../../models/Product";
import { Ok } from "../../../utils/server/commonError";
import { logHandler } from "../../../utils/server/commonHandler";

async function getCategory(category1?: string) {
    if (category1) {
        const categoryQuery = [{ $match: { category1 } }, { $group: { "_id": "category1", "categories": { $addToSet: "$category2" } } }, { $sort: { categories: 1 } }]
        //@ts-ignore
        return (await Product.aggregate(categoryQuery))[0]["categories"]
    } else {
        const categoryQuery = [{ $group: { "_id": "category1", "categories": { $addToSet: "$category1" } } }, { $sort: { "categories": 1 } }]
        //@ts-ignore
        return (await Product.aggregate(categoryQuery))[0]["categories"]
    }
}

const handler = logHandler()
    .get(
        async (req, res) => {
            const { category1 } = req.query
            return Ok(res, await getCategory(category1?.toString()))
        }
    )

export default handler