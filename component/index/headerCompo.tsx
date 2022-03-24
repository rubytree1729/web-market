import styles from '../../styles/headerCompo.module.css'
import Link from 'next/link'
import useCustomSWR from '../../utils/client/useCustumSWR'
import Router from 'next/router'

function HeaderCompo() {
    const { data, isLoading, isApiError, isServerError } = useCustomSWR("/api/user/info")
    if (isLoading) return <div>로딩중...</div>
    if (isServerError) {
        alert("서버 에러가 발생하였습니다")
    }
    if (isApiError) {
        return (
            <div>
                <div className={styles.header}>
                    <div className={styles.mainBar}>
                        <div className={styles.mainlogo}>사이트명</div>
                        <Link href="/login" passHref>
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
    return (
        <div>
            <div className={styles.header}>
                <div className={styles.mainBar}>

                    <div className={styles.mainlogo}>사이트명</div>
                    <Link href="/api/user/logout" passHref>
                        <div className={styles.loginBut}>로그아웃</div>
                    </Link>

                    <Link href="/mypage" passHref>
                        <div className={styles.loginBut}>마이페이지</div>
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