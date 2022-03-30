import Link from "next/link"
import PhoneNumberChange from "../../component/phonenumber/PhonenumberChange"
import useCustomSWR from "../../utils/client/useCustumSWR"
import customAxios from "../../utils/customAxios"
import userinfoStyle from "../../styles/mypage/userinfo.module.css"

export default function UserInfo() {
    // const { data, isLoading, isError } = useCustomSWR("/api/")
    // if (isError) return <div>failed to load</div>
    // if (isLoading) return <div>loading...</div>
    return (
        <table>
            <h2>회원정보</h2>
            <tbody>
                <tr>
                    <th className={userinfoStyle.row}>아이디</th>
                    {/* <td>{data.id}</td> */}
                </tr>
                <tr>
                    <th className={userinfoStyle.row}>비밀번호</th>
                    {/* <td>{data.password}</td> */}
                </tr>
                <tr>
                    <th className={userinfoStyle.row}>이름</th>
                    {/* <td>{data.name}</td> */}
                </tr>
                <tr>
                    <th className={userinfoStyle.row}>이메일</th>
                    {/* <td>{data.email}</td> */}
                </tr>
                <tr>
                    <th className={userinfoStyle.row}>휴대전화</th>
                    {/* <td>{data.phonenumber}</td> */}
                </tr>
                <tr>
                    <th className={userinfoStyle.row}>주소</th>
                    {/* <td>{data.fulladdress}</td> */}
                </tr>
            </tbody>
        </table>
    )

}
