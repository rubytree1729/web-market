import { useRouter } from 'next/router'
import mypageStyle from "../../styles/mypage/mypage.module.css"
import useCustomSWR from "../../utils/client/useCustumSWR";
import SideBar from '../../component/mypage/Sidebar';
import UserInfo from '../../component/mypage/UserInfo';
import Layout from '../../component/layout';

export default function MyPage() {
    const router = useRouter()
    const { data, isLoading, isApiError, isServerError } = useCustomSWR("/api/user/auth", {}, true)
    if (isLoading) return <div>로딩중...</div>
    if (isServerError) {
        alert("서버 에러가 발생하였습니다")
        router.push("/")
    }
    if (isApiError) {
        alert("로그인이 필요합니다")
        router.push("/login")
    }
    return (
        <Layout>
            <div className={mypageStyle.body}>
                <div className="sidebar">
                    <SideBar prop="userinfo" />
                </div>
                <div className={mypageStyle.content}>
                    <UserInfo />
                </div>
            </div>
        </Layout>
    )
}
