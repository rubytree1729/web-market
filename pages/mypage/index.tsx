import Link from "next/link";
import { useRouter } from 'next/router'
import LoginAuth from "../../component/auth/LoginAuth";
import Sidebar from "../../component/mypage/sidebar";
import UserInfo from "./userinfo";
import mypageStyle from "../../styles/mypage/mypage.module.css"
import HeaderCompo from "../../component/index/headerCompo";

export default function MyPage() {
    const router = useRouter();
    return (
        <LoginAuth>
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
        </LoginAuth>
    )
}
