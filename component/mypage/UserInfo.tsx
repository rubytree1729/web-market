import useCustomSWR from "../../utils/client/useCustumSWR"
import userinfoStyle from "../../styles/mypage/userinfo.module.css"
import { NextPage } from "next"


const UserInfo: NextPage = () => {
    const { data, isLoading, isError } = useCustomSWR("/api/user?info=true")
    if (isError) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>
    console.log(data)
    return (
        <div className={userinfoStyle.content}>
            <h2>회원정보</h2>
            <table>
                <tbody>
                    <tr>
                        <th className={userinfoStyle.row}>아이디</th>
                        <td>{data.id}</td>
                    </tr>
                    <tr>
                        <th className={userinfoStyle.row}>이름</th>
                        <td>{data.name}</td>
                    </tr>
                    <tr>
                        <th className={userinfoStyle.row}>이메일</th>
                        <td>{data.email}</td>
                    </tr>
                    <tr>
                        <th className={userinfoStyle.row}>휴대전화</th>
                        <td>{data.phonenumber}</td>
                    </tr>
                    <tr>
                        <th className={userinfoStyle.row}>주소</th>
                        <th>우편번호</th>
                        <td>{data.fulladdress.zonecode}</td>
                        <th>주소</th>
                        <td>{data.fulladdress.address}</td>
                        <th>상세주소</th>
                        <td>{data.fulladdress.addressdetail}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export default UserInfo