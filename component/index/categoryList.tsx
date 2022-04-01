import { REPL_MODE_STRICT } from 'repl'
import styles from '../../styles/categoryList.module.css'

function categoryList(props: any) {
    return (
        <div>
            <div className={styles.container}>
                <img className={styles.image} src={props.imageUrl}></img>
                <div className={styles.itemInfo}>
                    <div className={styles.infoStyle}>{props.name}</div>
                    <div className={styles.infoStyle}>{props.price}</div>
                    <div className={styles.infoStyle}>{props.category1} | {props.category2}</div>
                    <div className={styles.infoStyle}>찜하기 등 기타 여러개?</div>
                </div>
                <div className={styles.sideInfo}>
                    <div className={styles.makerStyle}>{props.maker}</div>
                    <div className={styles.postStyle}>택배비    3500원</div>
                </div>
            </div>
        </div>
    )
}

export default categoryList