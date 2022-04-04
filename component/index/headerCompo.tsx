import styles from '../../styles/HeaderCompo.module.css'
import Link from 'next/link'
import useCustomSWR from '../../utils/client/useCustumSWR'
import MenuToggle from '../menutoggle/MenuToggle'
import glasses from "./icon/free-icon-loupe-709592.png"
import cart from "./icon/free-icon-shopping-cart-481384.png"
import usericon from "./icon/free-icon-user-747376.png"
import Image from 'next/image'
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
                    <div className={styles.headbar}>
                        <div className={styles.menu}>
                            <MenuToggle />
                        </div>
                        <Link href="/" passHref>
                            <div className={styles.logo}>사이트명</div>
                        </Link>
                        <div className={styles.search}>
                            <input type="text" />
                            <button>🍳</button>
                        </div>
                        <div className={styles.mypage}>
                            <Link href="/login" passHref>
                                <div className={styles.loginBtn}>로그인</div>
                            </Link>
                            <div className={styles.itemBox}> <Image src={cart} /></div>

                        </div>

                    </div>

                </div>
            </div>
        )
    }
    return (
        <div>
            <div className={styles.header}>
                <div className={styles.headbar}>
                    <div className={styles.menu}>
                        <MenuToggle />
                    </div>
                    <Link href="/" passHref>
                        <div className={styles.logo}>사이트명</div>
                    </Link>
                    <div className={styles.search}>
                        <input type="text" />
                        <button><Image src={glasses} /></button>
                    </div>
                    <div className={styles.mypage}>
                        <div className={styles.itemBox}>
                            <Image src={cart} />
                        </div>
                        <Link href="/api/user/logout" passHref>
                            <div className={styles.loginbtn}>로그아웃</div>
                        </Link>

                        <Link href="/mypage" passHref>
                            <div className={styles.loginbtn}>
                                <Image src={usericon} />
                            </div>
                        </Link>

                    </div>
                </div>

            </div>

        </div >
    )
}

export default HeaderCompo