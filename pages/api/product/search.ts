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

    /* 입력: 
    sort: ["viewcount", "highprice", "lowprice"]
    display: 보여줄 물품 갯수
    byCategory: [true, false] 카테고리별로 보여줄지 결정
    category1: 카테고리1
    category2: 카테고리2
    pagenum: 페이지 번호
    */
    .get(
        validateRequest([]),
        async (req, res) => {
            let { sort, display, byCategory, id, category1, category2, pagenum } = req.query
            const totalQuery: Array<any> = []
            let sortQuery
            switch (sort) {
                case "viewcount":
                    sortQuery = "-viewcount"
                    break
                case "lowprice":
                    sortQuery = "price"
                    break
                default:
                    sortQuery = "-price"
            }
            const maxResults = Math.min(100, parseInt(display ? display.toString() : "10"))
            const parsedPagenum = pagenum ? parseInt(pagenum.toString()) : 1
            if (byCategory === "true") {
                const totalResult = await sendByCategory(maxResults)
                return Ok(res, totalResult)
            } else {
                const parsedId = id ? parseInt(id.toString()) : id
                let matchQuery
                if (parsedId) {
                    matchQuery = { "$match": { id: parsedId } }
                } else if (category2) {
                    matchQuery = { "$match": { category2 } }
                } else if (category1) {
                    matchQuery = { "$match": { category1 } }
                } else {
                    matchQuery = { "$match": {} }
                }
                totalQuery.push(matchQuery)
                const result = await Product.aggregate(totalQuery).sort(sortQuery).limit(parsedPagenum * maxResults).skip((parsedPagenum - 1) * maxResults)
                return Ok(res, result)
            }
        }
    )

export default handler