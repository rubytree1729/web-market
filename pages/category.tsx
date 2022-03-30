import styles from '../styles/category.module.css'
import FooterCompo from '../component/index/footerCompo'
import HeaderCompo from '../component/index/headerCompo'
import customAxios from '../utils/customAxios'
import useSWR from 'swr'
import { useState } from 'react'
import CategoryList from '../component/index/categoryList'


function CategoryBig(props: any) {
    return (
        <div className={styles.categoryBig}>{props.category1}</div>
    )
}


const Category = () => {
    const fetcher = (url: string) => customAxios(url).then((res: { data: any }) => res.data)
    const [categoryName, setCategoryName] = useState("")
    const { data, error } = useSWR(`/api/product/search?display=9&byCategory=true`, fetcher)

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    const props: any = { ...data.result }

    console.log(props)

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
                                    {Object.values(props).map((product: any) => <CategoryBig key={product.id} {...product}></CategoryBig>)}
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
                                        {Object.values(props).map((product: any) => <CategoryList key={product.id} {...product}></CategoryList>)}
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