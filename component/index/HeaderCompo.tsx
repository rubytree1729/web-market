import styles from '../../styles/HeaderCompo.module.css'
import Link from 'next/link'
import useCustomSWR from '../../utils/client/useCustumSWR'
import MenuToggle from '../menutoggle/MenuToggle'
import { NextPage } from 'next'

const HeaderCompo: NextPage = () => {
    const { data, isLoading, isApiError, isServerError } = useCustomSWR("/api/user?info=false")
    if (isLoading) return <div>로딩중...</div>
    if (isServerError) {
        alert("서버 에러가 발생하였습니다")
    }
    if (isApiError) {
        return (
            <div className={styles.header}>
                <div className={styles.headbar}>

                    <div className={styles.category}>
                        <MenuToggle />

                        <Link href="/" passHref>
                            <div className={styles.logo}></div>
                        </Link>
                    </div>

                    <div className={styles.searchcontainer}>
                        <div className={styles.search}>
                            <input type="text" />
                            <button></button>
                        </div>
                    </div>

                    <div className={styles.logingroup}>

                        <Link href="/login" passHref>
                            <div className={styles.loginBtn}>로그인</div>
                        </Link>
                        <span>|</span>

                        <Link href="/signup" passHref>
                            <div className={styles.loginBtn}>회원가입</div>
                        </Link>

                    </div>
                    <div className={styles.mypage}>
                        <Link href="/mypage" passHref>
                            <div className={styles.mypagebtn}>
                            </div>
                        </Link>
                        <div className={styles.itemBox}>
                        </div>

                    </div>
                </div>

            </div >



        )
    }
    const { role } = data
    if (role === "admin") {
        return (
            <div>
                <div className={styles.header}>
                    <div className={styles.headbar}>

                        <div className={styles.category}>
                            <MenuToggle />

                            <Link href="/" passHref>
                                <div className={styles.logo}></div>
                            </Link>
                        </div>

                        <div className={styles.searchcontainer}>
                            <div className={styles.search}>
                                <input type="text" />
                                <button></button>
                            </div>
                        </div>

                        <div className={styles.logingroup}>
                            <Link href="/admin" passHref>
                                <div>
                                    관리자
                                </div>
                            </Link>
                            <span>|</span>
                            <Link href="/api/logout" passHref>
                                <div className={styles.loginbtn}>로그아웃</div>
                            </Link>
                        </div>
                        <div className={styles.mypage}>
                            <Link href="/mypage" passHref>
                                <div className={styles.mypagebtn}>
                                </div>
                            </Link>
                            <div className={styles.itemBox}>
                            </div>

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

                            <Link href="/" passHref>
                                <div className={styles.logo}></div>
                            </Link>
                        </div>

                        <div className={styles.searchcontainer}>
                            <div className={styles.search}>
                                <input type="text" />
                                <button></button>
                            </div>
                        </div>

                        <div className={styles.logingroup}>
                            <Link href="/api/logout" passHref>
                                <div className={styles.loginbtn}>로그아웃</div>
                            </Link>
                        </div>
                        <div className={styles.mypage}>
                            <Link href="/mypage" passHref>
                                <div className={styles.mypagebtn}>
                                </div>
                            </Link>
                            <div className={styles.itemBox}>
                            </div>

                        </div>
                    </div>
                </div>
            </div >
        )
    }

}

export default HeaderCompo