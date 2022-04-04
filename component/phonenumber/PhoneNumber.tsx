import { useState, useRef } from 'react'
import customAxios from '../../utils/customAxios'
import AuthTimer from './AuthTimer'
import phoneNumberStyle from "../../styles/phoneNumber.module.css"

function PhoneNumber() {
    const checkNum = /[0-9]/

    const [PhoneNumber, setPhoneNumber] = useState("")
    const [WrongPhoneNumber, setwrongPhoneNumber] = useState("")
    const [Authnumber, setAuthnumber] = useState("")
    const [serverAuthNumber, setserverAuthNumber] = useState(Number)
    const [ValidationAuthNumber, setValidationAuthNumber] = useState(false)
    const [isOpen, setIsOpen] = useState(false);

    async function sendNumberApi() { //인증번호 API
        try {
            const request = await customAxios.post('/api/user/naverAuth', { "phonenumber": PhoneNumber })
            if (request.status === 200) {
                setserverAuthNumber(request.data.result)
                console.log(request.data.result)
                alert('인증번호를 전송하였습니다.')
            }
        } catch (err) {
            alert("인증번호를 전송에 실패했습니다.")
            console.log(err)
        }
    }
    //전화번호
    const PhoneNumberInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {//폰번호 입력 핸들러
        const phoneNumberValue = event.currentTarget.value
        if (validationPhoneNumber(phoneNumberValue)) {
            setPhoneNumber(phoneNumberValue)
        }
    }
    const validationPhoneNumber = (value: string) => {//폰 번호 유효성 판별
        if (value === "") {
            setwrongPhoneNumber("필수 정보입니다.")
            return false
        } else if (!checkNum.test(value)) {
            setwrongPhoneNumber("번호를 다시 확인해주세요")
            return false
        } else {
            setwrongPhoneNumber("")
            return true
        }

    }
    //번호인증
    const openCetificationValue = useRef(false)
    const openCetification = (boolean: boolean) => {//인증창 열기
        openCetificationValue.current = boolean
        setIsOpen(boolean)
    }

    const certificationPhoneNumber = (event: any) => {//인증번호 api 보내기
        event.preventDefault()
        if (!validationPhoneNumber(PhoneNumber)) {
            alert("번호를 다시 입력해주세요")
        } else {
            openCetification(true)
            sendNumberApi()
        }
    }
    const AuthnumberInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {//인증번호 입력
        setAuthnumber(event.currentTarget.value)
        console.log(event.currentTarget.value)

    }
    const validationAuthnumber = (event: any) => {//인증번호 확인
        event.preventDefault()
        if (parseInt(Authnumber) === serverAuthNumber) {
            alert("인증번호가 일치합니다.")
            setValidationAuthNumber(true)
            setIsOpen(false)
        } else {
            alert("인증번호가 일치하지 않습니다.")
            setValidationAuthNumber(false)
        }
    }
    return (
        <div className={phoneNumberStyle.content}>
            <label>
                전화번호
                <br />
                <input className={phoneNumberStyle.input} type="text" defaultValue={PhoneNumber} onChange={PhoneNumberInputHandler} placeholder='전화번호를 입력해주세요' />
            </label>
            <div className="validation">{WrongPhoneNumber}</div>
            <button onClick={certificationPhoneNumber}>인증번호 받기</button>
            {isOpen ?
                <div>
                    <input className={phoneNumberStyle.input} type="text" defaultValue={Authnumber} onChange={AuthnumberInputHandler} />
                    <AuthTimer
                        openCetification={openCetification}
                        ValidationAuthNumber={ValidationAuthNumber}
                    />
                    <button onClick={validationAuthnumber}>인증번호 확인</button>
                </div> : ""}
        </div>
    )
}
export default PhoneNumber