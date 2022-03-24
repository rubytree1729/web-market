import Link from 'next/link'
import styles from '../../styles/headerCompo.module.css'

function HeaderCompo() {
    return (
        <div>
            <div className={styles.header}>
                <div className={styles.mainBar}>
                    <div className={styles.mainlogo}>사이트명</div>
                    <Link href="/login">
                        <div className={styles.loginBut}>로그인</div>
                    </Link>

                </div>
                <div className={styles.searchBar}>
                    <div className={styles.search}>검색</div>
                    <div className={styles.itemBox}>장바구니</div>
                </div>
            </div>
            <div className={styles.outLine}></div>
        </div>
    )
}

export default HeaderCompo