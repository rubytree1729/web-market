import { NextPage } from 'next'
import { product } from '../../models/Product'
import styles from '../../styles/CategoryList.module.css'

const CategoryList: NextPage<{ data: product }> = ({ data }) => {
    return (
        <div>
            <div className={styles.container}>
                <img className={styles.image} src={data.imageUrl}></img>
                <div className={styles.itemInfo}>
                    <div className={styles.infoStyle}>{data.name}</div>
                    <div className={styles.infoStyle}>{data.price}</div>
                    <div className={styles.infoStyle}>{data.category1} | {data.category2}</div>
                    <div className={styles.infoStyle}>찜하기 등 기타 여러개?</div>
                </div>
                <div className={styles.sideInfo}>
                    <div className={styles.makerStyle}>{data.maker}</div>
                    <div className={styles.postStyle}>택배비    3500원</div>
                </div>
            </div>
        </div>
    )
}

export default CategoryList