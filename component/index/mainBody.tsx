import ItemList from './itemList'
import styles from '../../styles/mainbody.module.css'
import Product, { product } from '../../models/Product'


const MainBody = (props: object) => {
    const ArrayProps = Object.values(props)
    const newArrayProps: product[][] = []
    for (let i = 0; i < 9; i++) {
        newArrayProps.push(ArrayProps.slice(2 * i, 2 * (i + 1)))
    }

    return (
        <div className={styles.main}>
            <div className={styles.mainList}>
                <div className={styles.sideBar}>
                    <div className={styles.category}>카테고리</div>
                    <div>
                        <div className={styles.menu}>가구</div>
                        <div className={styles.menu}>가전</div>
                        <div className={styles.menu}>건강</div>
                        <div className={styles.menu}>디지털</div>
                        <div className={styles.menu}>도서</div>
                        <div className={styles.menu}>미용</div>
                        <div className={styles.menu}>식품</div>
                        <div className={styles.menu}>생활</div>
                        <div className={styles.menu}>생활편의</div>
                        <div className={styles.menu}>여가</div>
                        <div className={styles.menu}>육아</div>
                        <div className={styles.menu}>인테리어</div>
                        <div className={styles.menu}>출산</div>
                        <div className={styles.menu}>패션의류</div>
                        <div className={styles.menu}>화장품</div>
                    </div>
                </div>
                <div className={styles.itemList}>
                    {newArrayProps.map(twoproducts => <ItemList {...twoproducts}></ItemList>)}
                    {/* {Object.values(props).map(product=> <ItemList {...product}></ItemList>)} */}
                </div>
            </div>
        </div>
    )
}

export default MainBody