import sidebarStyle from "../../styles/mypage/sidebar.module.css"
import Link from "next/link"

function SideBar(props: any) {
    console.log(props.prop)
    return (
        <div className={sidebarStyle.content}>
            <h3>마이페이지</h3>
            <Link href="/mypage">
                <span className={props.prop === "userinfo" ? sidebarStyle.spanselect : sidebarStyle.span}>회원 정보</span>
            </Link>
            <Link href="/mypage/passwordchange">
                <span className={props.prop === "passwordchange" ? sidebarStyle.spanselect : sidebarStyle.span}> 비밀번호 변경</span>
            </Link>
            <Link href="/mypage/addresschange">
                <span className={props.prop === "addresschange" ? sidebarStyle.spanselect : sidebarStyle.span}>주소 변경</span>
            </Link>
            <Link href="/mypage/orderhistory">
                <span className={props.prop === "orderhistory" ? sidebarStyle.spanselect : sidebarStyle.span}>주문 내역</span>
            </Link>
        </div>
    )
}
export default SideBar