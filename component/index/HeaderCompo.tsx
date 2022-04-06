import styles from '../../styles/HeaderCompo.module.css'
import Link from 'next/link'
import useCustomSWR from '../../utils/client/useCustumSWR'
import MenuToggle from '../menutoggle/MenuToggle'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import customAxios from '../../utils/customAxios'

const HeaderCompo: NextPage = () => {
    const router = useRouter()
    const { data, isLoading, isApiError, isServerError } = useCustomSWR("/api/user?info=false")
    if (isLoading) return <div>로딩중...</div>
    if (isServerError) {
        alert("서버 에러가 발생하였습니다")
    }
    if (isApiError) {
        return (
            <div>
                <div className={styles.header}>
                    <div className={styles.headbar}>
                        <div className={styles.category}>
                            <MenuToggle />
                        </div>
                        <div className={styles.searchcontainer}>
                            <Link href="/" passHref>
                                <div className={styles.logo}></div>
                            </Link>

                            <div className={styles.search}>
                                <input type="text" />
                                <button></button>
                            </div>
                        </div>
                        <div className={styles.mypage}>
                            <Link href="/login" passHref>
                                <div className={styles.loginBtn}>로그인</div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
    function logout() {
        customAxios.delete("/api/login")
    }
    const { role } = data
    if (role === "admin") {
        return (
            <div>
                <div className={styles.header}>
                    <div className={styles.headbar}>
                        <div className={styles.category}>
                            <MenuToggle />
                        </div>
                        <div className={styles.searchcontainer}>
                            <Link href="/" passHref>
                                <div className={styles.logo}></div>
                            </Link>

                            <div className={styles.search}>
                                <input type="text" />
                                <button></button>
                            </div>
                        </div>
                        <div className={styles.mypage}>
                            <Link href="/admin" passHref>
                                <div>
                                    관리자
                                </div>
                            </Link>
                            <div className={styles.itemBox}>
                            </div>
                            <Link href="/mypage" passHref>
                                <div className={styles.mypagebtn}>
                                </div>
                            </Link>
                            <div className={styles.loginbtn} onClick={logout}>로그아웃</div>
                        </div>
                    </div>
                </div>
            </div >
        )
    } else {
        return (
            <div>
                <div className={styles.header}>
                    <div className={styles.headbar}>
                        <div className={styles.category}>
                            <MenuToggle />
                        </div>
                        <div className={styles.searchcontainer}>
                            <Link href="/" passHref>
                                <div className={styles.logo}></div>
                            </Link>

                            <div className={styles.search}>
                                <input type="text" />
                                <button></button>
                            </div>
                        </div>
                        <div className={styles.mypage}>
                            <div className={styles.itemBox}>
                            </div>
                            <Link href="/mypage" passHref>
                                <div className={styles.mypagebtn}>
                                </div>
                            </Link>
                            <Link href="/api/logout" passHref>
                                <div className={styles.loginbtn} onClick={logout}>로그아웃</div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div >
        )
    }

}

export default HeaderCompo