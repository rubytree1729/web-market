import Link from "next/link";
import { useRouter } from 'next/router'
import UserInfo from "./userinfo";
import LoginAuth from "../../component/auth/LoginAuth";

export default function MyPage() {
    const router = useRouter();
    return (
        <LoginAuth>
            <div>
                <div className="header">

                </div>
                <div className="body">
                    <UserInfo />
                </div>
                <div className="footer">

                </div>
            </div>
        </LoginAuth>
    )
}
