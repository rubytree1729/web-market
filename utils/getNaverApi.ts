import axios from "axios"
import Product, { product } from "../models/Product"

type naverShopping = {
    title: string,
    link: string,
    image: string,
    lprice: string,
    hprice: string,
    mallName: string,
    productId: string,
    productType: string,
    brand: string,
    maker: string,
    category1: string,
    category2: string,
    category3: string,
    category4: string
}

export async function insertDataByCategory() {
    const category = ["식품", "패션의류", "디지털/가전", "출산/육아", "생활/건강", "가구/인테리어", "도서", "화장품/미용", "여가/생활편의"]
    for (let i of category) {
        const result: naverShopping[] = (await getNaverApi(i))["items"]
        for (let data of result) {
            const { title, image, lprice, mallName, productId, brand, maker, category1 } = data
            const product_data: product = { id: parseInt(productId), name: title, price: parseInt(lprice), category: category1, imageUrl: image, mallName, brand, maker }
            await new Product(product_data).save()
        }
    }
}

export default async function getNaverApi(keyword: string) {
    return (await axios.get(`https://openapi.naver.com/v1/search/shop.json?query=${encodeURI(keyword)}&display=100`, {
        headers: {
            "X-Naver-Client-Id": process.env.NEXT_PUBLIC_NAVER_CLIENT_ID!,
            "X-Naver-Client-Secret": process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET!
        }
    })).data
} 