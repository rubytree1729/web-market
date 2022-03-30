import styles from '../styles/category.module.css'
import FooterCompo from '../component/index/footerCompo'
import HeaderCompo from '../component/index/headerCompo'
import customAxios from '../utils/customAxios'
import useSWR from 'swr'
import { useState } from 'react'
import CategoryList from '../component/index/categoryList'
import useCustomSWR from '../utils/client/useCustumSWR'


function CategoryBig(props: any) {
    return (
        <div className={styles.categoryBig}>{props.category}</div>
    )
}


const Category = () => {
    const [selectedCategory, setSelectedCategory] = useState([])

    let category1Data = useCustomSWR("/api/product/category")
    let category2Data
    if (selectedCategory) {
        category2Data = useCustomSWR(`/api/product/category?category1=${selectedCategory[0]}`)
    }
    if (category1Data.isLoading || category2Data?.isLoading) {
        return <div>로딩중</div>
    }
    console.log(category1Data.data, category2Data?.data)

    function clickCategory1() {

    }
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
                                    {category1Data.data.map((category: string) => <div onClick={clickCategory1} className={styles.categoryBig}>{category}</div>)}
                                </div>
                            </div>
                            <div className={styles.smallCategoryTag}>
                                <div className={styles.smallCategory}>소분류칸</div>
                                <div className={styles.smallCategoryFilter}>
                                    소분류 필터
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
                                        {/* {Object.values(props).map((product: any) => <CategoryList key={product.id} {...product}></CategoryList>)} */}
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