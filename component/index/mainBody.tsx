import ItemList from './itemList'
import styles from '../../styles/mainbody.module.css'
import Product, { product } from '../../models/Product'
import Carousel from '../carousel/Carousel'



const MainBody = (props: object) => {
    const ArrayProps = Object.values(props)
    const newArrayProps: product[][] = []
    for (let i = 0; i < 9; i++) {
        newArrayProps.push(ArrayProps.slice(2 * i, 2 * (i + 1)))
    }

    return (
        <div className={styles.main}>
            <Carousel></Carousel>
            <div className={styles.mainList}>

                <div className={styles.itemList}>
                    {newArrayProps.map(twoproducts => <ItemList {...twoproducts}></ItemList>)}
                    {/* {Object.values(props).map(product=> <ItemList {...product}></ItemList>)} */}
                </div>
            </div>
        </div>
    )
}

export default MainBody