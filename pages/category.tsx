import styles from '../styles/category.module.css'
import FooterCompo from '../component/index/footerCompo'
import HeaderCompo from '../component/index/headerCompo'
import { useState } from 'react'
import CategoryList from '../component/index/categoryList'
import useCustomSWR from '../utils/client/useCustumSWR'
import customAxios from '../utils/customAxios'

const Category = () => {
    const [category1, setCategory1] = useState("")
    const [category2, setCategory2] = useState("")
    const categorySWR = useCustomSWR("/api/product/category")
    const productSWR = useCustomSWR(`/api/product/search?category1=${category1}&category2=${category2}`)
    if (categorySWR.isLoading) {
        return <div>로딩중</div>
    }
    const categoryData = categorySWR.data
    const productData = productSWR.data

    function clickCategory1(e: any) {
        setCategory1(e.target.innerText)
        setCategory2("")
    }

    function clickCategory2(e: any) {
        setCategory2(e.target.innerText)
    }
    const category1Data: Array<string> = []
    categoryData.forEach((category: any) => category1Data.push(category.category1));
    category1Data.sort()
    let category2Data: Array<string> = []
    category1 && categoryData.forEach((category: any) => {
        if (category.category1 === category1) {
            category2Data = category.category2
        }
    })
    category2Data.sort()
    console.log(categoryData, productData)
    return (
        <div>
            <header>
                <HeaderCompo></HeaderCompo>
            </header>
            <main>
                <div className={styles.container}>
                    <div className={styles.totalContainer}>
                        <div className={styles.category}>
                            <div className={styles.categoryTag}>
                                <div className={styles.categoryList}>카테고리칸</div>
                                <div className={styles.categoryFilter}>
                                    {category1Data && category1Data.map((category: string) => <div onClick={clickCategory1} className={styles.categoryBig}>{category}</div>)}
                                </div>
                            </div>
                            <div className={styles.smallCategoryTag}>
                                <div className={styles.smallCategory}>소분류칸</div>
                                <div className={styles.smallCategoryFilter}>
                                    {category2Data && category2Data.map((category: string) => <div onClick={clickCategory2} className={styles.categoryBig}>{category}</div>)}
                                </div>
                            </div>
                            <div className={styles.priceRankTag}>
                                <div className={styles.priceRank}>가격순</div>
                                <div className={styles.priceRankFilter}>가격순 필터 칸</div>
                            </div>
                        </div>

                        <div>
                            <div className={styles.sort}>
                                <div>조회수 순</div>
                                <div>높은 가격순</div>
                                <div>낮은 가격순</div>
                            </div>

                            <div className={styles.price}>
                                {/* -------------------------제품리스트---------------------- */}
                                <div className={styles.itemList}>
                                    <div className={styles.priceList}>
                                        {productData && productData.map((product: any) => <CategoryList key={product.id} {...product} />)}
                                    </div>
                                </div>
                                {/* --------------------------랭킹?--------------------------- */}
                                <div className={styles.Ranking}>
                                    <div className={styles.RankingList}>랭킹</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer>
                <FooterCompo></FooterCompo>
            </footer>
        </div>
    )
}

export default Category