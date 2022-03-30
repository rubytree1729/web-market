import Link from "next/link";
import { useRouter } from 'next/router'
import mypageStyle from "../../styles/mypage/mypage.module.css"
import HeaderCompo from "../../component/index/headerCompo";
import SideBar from "../../component/mypage/SideBar";
import Addresschange from "../../component/mypage/AddressChange";
import useCustomSWR from "../../utils/client/useCustumSWR";

export default function MyPage() {
    const router = useRouter();
    const { data, isLoading, isApiError, isServerError } = useCustomSWR("/api/user/auth")
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
                    <SideBar prop="addresschange" />
                </div>
                <div className={mypageStyle.content}>
                    <Addresschange />
                </div>

            </div>
            <div className="footer">

            </div>
        </div>
    )
}
