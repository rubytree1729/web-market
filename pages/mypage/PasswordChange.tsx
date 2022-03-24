import axios from "axios"
import { useRouter } from "next/router";
import { useState } from "react"

export default function Passwordchange() {
    const [CurrentPassword, setCurrentPassword] = useState("")
    const [wrongCurrentPassword, setwrongCurrentPassword] = useState("")
    const [NewPassword, setNewPassword] = useState("")
    const [wrongNewPassword, setwrongNewPassword] = useState("")
    const [CheckNewPassword, setCheckNewPassword] = useState("")
    const [wrongCheckNewPassword, setwrongCheckNewPassword] = useState("")

    const checkNum = /[0-9]/
    const checkLowerEng = /[a-z]/
    const checkUpperEng = /[A-Z]/
    const checkSpc = /[~!@#$%^&*()_+|<>?:{}]/
    const checkKor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/
    const checkBlank = /\s/
    const router = useRouter()

    async function changePasswordApi() {
        try {
            const request = await axios.post("", {
                "password": CurrentPassword,
                "newpassword": CheckNewPassword
            })
            if (request.status === 200) {
                if (request.data.result === true) {
                    "변경되었습니다"
                } else
                    "현재 비밀번호가 일치하지 않습니다."
                console.log(request.data)
            }
            return request.data
        } catch (err) {
            "잘못된 접근입니다"
            console.log(err)
        }
    }



    const CurrentPasswordInputHandler = (event: any) => {
        const CurrentPasswordValue = event.currentTarget.value
        setCurrentPassword(CurrentPasswordValue)
        if (CurrentPasswordValue === "") {
            setwrongCurrentPassword("현재 비밀번호를 입력해주세요.")
        }
    }

    const NewPasswordInputHandler = (event: any) => {
        const NewPasswordValue = event.currentTarget.value
        setNewPassword(NewPasswordValue)
        if (NewPasswordValue === "") {
            setwrongNewPassword("새 비밀번호를 입력해주세요.")
        } else if (NewPasswordValue.length < 8 || NewPasswordValue.length > 16 || !(checkLowerEng.test(NewPasswordValue)) || !(checkUpperEng.test(NewPasswordValue))) {
            setwrongNewPassword("8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.")
        } else if (NewPasswordValue === CurrentPassword) {
            setwrongNewPassword("현재 비밀번호와 같습니다.")
        } else {
            setwrongNewPassword("")
        }

    }
    const CheckNewPasswordInputHandler = (event: any) => {
        const CheckNewPasswordValue = event.currentTarget.value
        setCheckNewPassword(CheckNewPasswordValue)
        if (CheckNewPasswordValue === "") {
            setwrongCheckNewPassword("새 비밀번호를 입력해주세요.")
        } else if (CheckNewPasswordValue !== NewPassword) {
            setwrongCheckNewPassword("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.")
        } else {
            setwrongNewPassword("")
        }
    }


    return (
        <div className="container">
            <h2>비밀번호 변경</h2>
            현재 비밀번호<input type="password" value={CurrentPassword} onChange={CurrentPasswordInputHandler} />
            <div className="validation">{wrongCurrentPassword}</div>
            새비밀번호 <input type="password" value={NewPassword} onChange={NewPasswordInputHandler} />
            <div className="validation">{wrongNewPassword}</div>
            새비밀번호 확인 <input type="password" value={CheckNewPassword} onChange={CheckNewPasswordInputHandler} />
            <div className="validation">{wrongCheckNewPassword}</div>
            <button onClick={changePasswordApi}>비밀번호 변경</button>
            <button onClick={() => { router.push("/mypage") }}>뒤로가기</button >
        </div>
    )

}