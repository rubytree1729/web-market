import Product from "../../../models/Product";
import { Err, Ok } from "../../../utils/server/commonError";
import { logHandler } from "../../../utils/server/commonHandler";
import Category, { category } from "../../../models/Category";

async function getCategory(category1?: string) {
    if (category1) {
        const categoryQuery = [{ $match: { category1 } }, { $group: { "_id": "category1", "categories": { $addToSet: "$category2" } } }]
        const result = await Product.aggregate(categoryQuery)
        if (result.length != 0) {
            return result[0]["categories"]
        }
    } else {
        const categoryQuery = [{ $group: { "_id": "category1", "categories": { $addToSet: "$category1" } } }]
        const result = await Product.aggregate(categoryQuery)
        if (result.length != 0) {
            return result[0]["categories"]
        }
    }
}

// async function saveCategory() {
//     const categoryQuery = [{ $group: { "_id": "$category1", "category1": { $first: "$category1" }, "category2": { $addToSet: "$category2" } } },
//     { $project: { "_id": 0, "category1": 1, "category2": 1 } }]
//     const newCategory: Array<category> = await Product.aggregate(categoryQuery)
//     await Category.deleteMany()
//     await Category.insertMany(newCategory)
// }


const handler = logHandler()
    .get(
        async (req, res) => {
            // saveCategory()
            const { category1 } = req.query
            const result = await getCategory(category1?.toString())
            if (result) {
                return Ok(res, result)
            } else {
                return Err(res, "not a valid query")
            }
        }
    )

export default handler