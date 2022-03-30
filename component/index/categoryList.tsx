import { REPL_MODE_STRICT } from 'repl'
import styles from '../../styles/categoryList.module.css'

function categoryList(props: any) {
    return (
        <div>
            <div className={styles.container}>
                <img className={styles.image} src={props.imageUrl}></img>
                <div className={styles.itemInfo}>
                    <div>{props.name}</div>
                    <div>{props.price}</div>
                    <div>{props.category1} /{props.category2}</div>
                    <div>찜하기 등 기타 여러개?</div>
                </div>
                <div className={styles.sideInfo}>
                    <div>{props.maker}</div>
                    <div>택배비    3500원</div>
                </div>
            </div>
        </div>
    )
}

export default categoryList