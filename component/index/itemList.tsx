import Link from 'next/link'
import styles from '../../styles/itemList.module.css'

function Item(props: any) {
    return (
        <div>
            <div>
                <Link href={`/purchase?id=${props.id}`}>
                    <div className={styles.lList}>
                        <img className={styles.imageUrl} src={props.imageUrl}></img>
                        <div className={styles.info}>
                            <div className={styles.name}>{props.name}</div>
                            <div className={styles.price}>{props.price}원</div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}


function ItemList(props: any) {
    return (
        <div className={styles.style}>

            <div>
                <div className={styles.category}>{props[0].category1}</div>
            </div>

            <div className={styles.item}>
                {Object.values(props).map(product => <Item {...product}></Item>)}
            </div>
        </div>
    )
}

export default ItemList