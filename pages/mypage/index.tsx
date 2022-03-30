import { useRouter } from 'next/router'
import Sidebar from "../../component/mypage/sidebar";
import UserInfo from "./userinfo";
import mypageStyle from "../../styles/mypage/mypage.module.css"
import HeaderCompo from "../../component/index/headerCompo";
import useCustomSWR from "../../utils/client/useCustumSWR";

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
        <div className={mypageStyle.container}>
            <div className="header">
                <HeaderCompo />
            </div>
            <div className={mypageStyle.body}>
                <div className="sidebar">
                    <Sidebar />
                </div>
                <div className={mypageStyle.constent}>
                    <UserInfo />
                </div>
            </div>
            <div className="footer">
            </div>
        </div>
    )
}
