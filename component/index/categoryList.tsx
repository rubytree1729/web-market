import Link from 'next/link'
import styles from '../../styles/categoryList.module.css'



function categoryList() {
    return (
        <div>
            <div className={styles.container}>
                <div className={styles.image}>상품이미지</div>
                <div className={styles.itemInfo}>
                    <div>상품 이름</div>
                    <div>가격</div>
                    <div>카테고리</div>
                    <div>찜하기 등 기타 여러개?</div>
                </div>
                <div className={styles.sideInfo}>
                    <div>판매처</div>
                    <div>택배비</div>
                </div>
            </div>
        </div>
    )

}

export default categoryList