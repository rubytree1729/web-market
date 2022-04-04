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
    id: 상품 번호
    keyword: 검색어
    category1: 카테고리1
    category2: 카테고리2    
    byCategory: [true, false] 카테고리별로 보여줄지 결정
    sort: ["viewcount", "highprice", "lowprice"]
    display: 보여줄 물품 갯수
    pagenum: 페이지 번호
    */
    .get(
        validateRequest([]),
        async (req, res) => {
            console.log(req.url, req.method)
            let { id, keyword, category1, category2, byCategory, sort, display, pagenum } = req.query
            const maxResults = Math.min(100, parseInt(display ? display.toString() : "10"))
            if (byCategory === "true") {
                const totalResult = await sendByCategory(maxResults)
                return Ok(res, totalResult)
            } else {
                const totalQuery: Array<any> = []
                totalQuery.push(
                    { "$match": {} },
                )
                if (keyword) {
                    totalQuery.push({ "$match": { name: new RegExp(keyword?.toString(), "i") } })
                }
                if (id) {
                    totalQuery.push({ "$match": { id: parseInt(id?.toString()) } })
                }
                if (category1) {
                    totalQuery.push({ "$match": { category1 } })
                }
                if (category2) {
                    totalQuery.push({ "$match": { category2 } })
                }
                let sortQuery: string
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
                const parsedPagenum = pagenum ? parseInt(pagenum.toString()) : 1
                const result = await Product.aggregate(totalQuery).sort(sortQuery).limit(parsedPagenum * maxResults).skip((parsedPagenum - 1) * maxResults)
                const totalnum = (await Product.aggregate(totalQuery)).length
                return Ok(res, { data: result, metadata: { totalnum } })
            }
        }
    )

export default handler