import Product from "../../../models/Product";
import { Ok } from "../../../utils/server/commonError";
import { customHandler } from "../../../utils/server/commonHandler";

async function getCategory() {
    const categoryQuery = [{ $group: { "_id": "$category1", "category1": { $first: "$category1" }, "category2": { $addToSet: "$category2" } } },
    { $project: { "_id": 0, "category1": 1, "category2": 1 } }]
    return await Product.aggregate(categoryQuery)
}


const handler = customHandler()
    .get(
        async (req, res) => {
            const result = await getCategory()
            return Ok(res, result)
        }
    )

export default handler