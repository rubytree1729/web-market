import sidebarStyle from "../../styles/mypage/sidebar.module.css"
import Link from "next/link"

function Sidebar() {
    return (
        <div className={sidebarStyle.content}>
            <Link href="/mypage/userinfo">
                회원정보
            </Link>
            <Link href="/mypage/passwordChange">
                비밀번호 변경
            </Link>
            <Link href="/mypage/addresschange">
                주소 변경
            </Link>
            <Link href="/mypage/orderhistory">
                주문 내역
            </Link>

        </div>
    )
}
export default Sidebar