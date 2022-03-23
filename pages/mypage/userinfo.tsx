import customAxios from "../../utils/customAxios"
import Link from "next/link"
import PhoneNumberChange from "../../component/phonenumber/PhonenumberChange"
import PasswordChange from "./PasswordChange"
export default function UserInfo() {
    async function getUserInfo() {
        try {
            const res = await customAxios.get("")
            const data = res.data
            return { user: data }
        } catch (err) {
            console.log(err)

        }
    }
    return (
        <form>
            <table>
                <tbody>
                    <tr>
                        <th>아이디</th>
                        <td></td>
                    </tr>
                    <tr>
                        <th>비밀번호</th>
                        <td>
                            {/* <div>
                                <PasswordChange></PasswordChange>
                            </div> */}
                            <Link href="/mypage/PasswordChange">
                                <button>비밀번호 변경</button>
                            </Link>
                        </td>
                    </tr>
                    <tr>
                        <th>이름</th>
                        <td></td>
                    </tr>
                    <tr>
                        <th>이메일</th>
                        <td></td>
                    </tr>
                    <tr>
                        <th>휴대전화</th>
                        <td>
                            <PhoneNumberChange />
                        </td>

                    </tr>
                    <tr>
                        <th>주소</th>
                        <td>
                            <Link href="/mypage/AddressChange">
                                <button>주소 변경</button>
                            </Link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    )

}
