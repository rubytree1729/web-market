import { useState, useRef } from "react"
import Axios, { AxiosResponse } from 'axios'
import axios from "axios"
import AddressInput from "../../component/address/AddressInput"
import AuthTimer from "./AuthTimer"
import { useRouter } from "next/router"
import { envExist } from "../../utils/validateEnv"
import { axiosConfig } from "../../utils/commonHandler"
import customAxios from "../../utils/customAxios"


export default function SignUp() {
  const [Id, setId] = useState("")
  const [WrongId, setWrongId] = useState("")
  const [ValidationId, setvalidationId] = useState(false)
  const [Password, setPassword] = useState("")
  const [PasswordCheck, setPasswordCheck] = useState("")
  const [WrongPassword, setwrongPassword] = useState("")
  const [WrongPasswordCheck, setwrongPasswordCheck] = useState("")
  const [ValidationPassword, setvalidationPassword] = useState(false)
  const [Name, setName] = useState("")
  const [WrongName, setwrongName] = useState("")
  const [ValidationName, setvalidationName] = useState(false)
  const [Gender, setGender] = useState("")
  const [Validationgender, setvalidationgender] = useState(false)
  const [Email, setEmail] = useState("")
  const [WrongEmail, setwrongEmail] = useState("")
  const [ValidationEmail, setvalidationEmail] = useState(false)
  const [PhoneNumber, setPhoneNumber] = useState("")
  const [WrongPhoneNumber, setwrongPhoneNumber] = useState("")
  const [Zonecode, setZonecode] = useState(''); // 우편번호
  const [Address, setAddress] = useState(''); // 주소
  const [AddressDetail, setAddressDetail] = useState(''); // 상세주소
  const [Validationaddress, setvalidationaddress] = useState(false)
  const [authnumber, setauthnumber] = useState("")
  const [serverAuthNumber, setserverAuthNumber] = useState(Number)
  const [ValidationAuthNumber, setValidationAuthNumber] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter()


  const checkNum = /[0-9]/
  const checkLowerEng = /[a-z]/
  const checkUpperEng = /[A-Z]/
  const checkSpc = /[~!@#$%^&*()_+|<>?:{}]/
  const checkKor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/
  const checkBlank = /\s/



  function accountRegister(event: any) {
    event.preventDefault()
    if (ValidationId === false || ValidationPassword === false || ValidationName === false || Validationgender === false || ValidationEmail === false || ValidationAuthNumber === false) {
      console.log("뭔가 잘못됨")
      console.log(typeof ValidationId + "id")
      console.log(typeof ValidationPassword + "password")
      console.log(typeof ValidationName + "name")
      console.log(typeof Validationgender + "gen")
      console.log(typeof ValidationEmail + "email")
      console.log(typeof Validationaddress + "add")
      alert('다시 입력해주세요.')
    } else {
      customAxios.post('/api/user/register', {
        "id": Id,
        "password": Password,
        "name": Name,
        "email": Email,
        "gender": Gender,
        "phonenumber": PhoneNumber,
        "fulladdress": {
          "zonecode": Zonecode,
          "address": Address,
          "addressdetail": AddressDetail
        },
        "authnumber": authnumber
      })
        .then((res: AxiosResponse) => {
          if (res.status == 200) {
            //로그인 성공
            router.replace('/')
            alert('ok')
          } else {
            alert('failed')
          }
        })
        .catch(err => alert(err)) //로그인 실패
    }
  }
  const checkIdApi = (event: any) => {
    event.preventDefault()

    if (ValidationId === true) {
      axios.post('/api/user/checkId', { "id": Id }, {
        validateStatus: function (status) {
          // 상태 코드가 500 이상일 경우 거부. 나머지(500보다 작은)는 허용.
          return status < 500;
        }
      })
        .then((res: AxiosResponse) => {
          console.log(res)
          // console.log(res.data)
          if (res.status === 200) {
            //메인 화면으로 보내기 구현
            setvalidationId(true)
            alert('사용할 수 있는 아이디 입니다.')
          }
          else {
            alert("존재하는 아이디 입니다.")
            setvalidationId(false)
          }
        })
        .catch(err => alert(err))
    } else {
      alert("아이디를 다시 입력해주세요")
    }
  }

  const IdInputHandler = (event: any) => {
    const idValue = event.currentTarget.value
    setId(idValue)
    if (idValue === "") {
      setWrongId("필수 정보입니다.")
      setvalidationId(false)
    }
    else if (idValue.length < 5 || idValue.length > 20 || checkKor.test(idValue) || checkSpc.test(idValue)) {
      setWrongId("5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.")
      setvalidationId(false)
    } else {
      setWrongId("")
      console.log(ValidationId + "id")
      setvalidationId(true)
    }

  }
  const PasswordInputHandler = (event: any) => {
    const passwordValue = event.currentTarget.value
    setPassword(passwordValue)
    if (passwordValue === "") {
      setwrongPassword("필수 정보입니다.")
    } else if (passwordValue.length < 8 || passwordValue.length > 16 || !(checkLowerEng.test(passwordValue)) || !(checkUpperEng.test(passwordValue))) {
      setwrongPassword("8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.")
    } else {
      setwrongPassword("")
    }

  }
  const PasswordCheckInputHandler = (event: any) => {
    setPasswordCheck(event.currentTarget.value)
    if (event.currentTarget.value !== Password) {
      setwrongPasswordCheck("비밀번호가 일치하지 않습니다.")
    } else {
      setwrongPasswordCheck("패스워드가 일치합니다.")
      setvalidationPassword(true)
      console.log(ValidationPassword + "password")

    }

  }
  const NameInputHandler = (event: any) => {
    const nameValue = event.currentTarget.value
    setName(nameValue)
    if (nameValue === "") {
      setwrongName("필수 정보입니다.")
    } else if (checkSpc.test(nameValue) || checkBlank.test(nameValue)) {
      setwrongName("한글과 영문 대 소문자를 사용하세요. (특수기호, 공백 사용 불가)")
    } else {
      setwrongName("")
      setvalidationName(true)
      console.log(ValidationName + "name")
    }

  }
  const GenderInputHandler = (event: any) => {
    const genderValue = event.target.value
    setGender(genderValue)
    setvalidationgender(true)
    console.log(Validationgender + "gender")
  }
  const EmailInputHandler = (event: any) => {
    const emailValue = event.currentTarget.value
    setEmail(emailValue)
    if (emailValue === "") {
      setwrongEmail("필수 정보입니다.")
    } else if (emailValue.indexOf('@') < 1 || emailValue.indexOf('.com') < 1) {
      setwrongEmail("이메일 주소를 다시 확인해주세요")
    } else {
      setwrongEmail("")
      setvalidationEmail(true)
      console.log(ValidationEmail + "email")
    }


  }

  const PhoneNumberInputHandler = (event: any) => {
    const phoneNumberValue = event.currentTarget.value
    setPhoneNumber(phoneNumberValue)
    if (phoneNumberValue === "") {
      setwrongPhoneNumber("필수 정보입니다.")
    } else if (!checkNum.test(phoneNumberValue)) {
      setwrongPhoneNumber("번호를 다시 확인해주세요")
    } else {
      setwrongPhoneNumber("")
      console.log(PhoneNumber)
    }

  }
  async function sendNumberApi() {
    try {
      const request = await axios.post('/api/user/naverAuth', { "phonenumber": PhoneNumber },
        {
          baseURL: envExist(process.env.NEXT_PUBLIC_BASE_URL, "next public base url"),
          validateStatus: function (status) {
            // 상태 코드가 500 이상일 경우 거부. 나머지(500보다 작은)는 허용.
            console.log("-1")
            return status < 500
          }
        })
      console.log("0")
      console.log(request)
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
  const openCetificationValue = useRef(false)
  const openCetification = (boolean: boolean) => {//인증창 열기
    openCetificationValue.current = boolean
    setIsOpen(boolean)
  }

  const phoneNumberCertification = (event: any) => {//인증번호 api 보내기
    event.preventDefault()
    if (PhoneNumber === "") {
      alert("번호를 입력해주세요")
    } else {
      openCetification(true)
      sendNumberApi()
    }
  }
  const authnumberInputHandler = (event: any) => {//인증번호 입력
    setauthnumber(event.currentTarget.value)
    console.log(event.currentTarget.value)

  }

  const authnumberFunction = (event: any) => {//인증번호 확인
    event.preventDefault()

    if (parseInt(authnumber) === serverAuthNumber) {
      alert("인증번호가 일치합니다.")
      setValidationAuthNumber(true)
    } else {
      alert("인증번호가 일치하지 않습니다.")
      setValidationAuthNumber(false)
    }
  }

  const addressValue = useRef(null)
  const setAddressFunction = (value: any) => {
    addressValue.current = value
    setAddress(value)
    setvalidationaddress(true)
    console.log(Validationaddress + "add")
  }
  const zonecodeValue = useRef(null)
  const setZonecodeFunction = (value: any) => {
    zonecodeValue.current = value
    setZonecode(value)
  }


  return (
    <div className='container' style={{ textAlign: "center" }}>
      <form>
        <label>
          아이디
          <input type="text" defaultValue={Id} onChange={IdInputHandler} placeholder="아이디를 입력해주세요" />
          <div className="validation">{WrongId}</div>
          <button className="checkId" onClick={checkIdApi}>아이디확인</button>
        </label>

        <label>
          패스워드
          <input type="password" defaultValue={Password} onChange={PasswordInputHandler} placeholder='비밀번호를 입력해주세요' />
        </label>
        <div className="validation">{WrongPassword}</div>

        <label>
          패스워드 확인
          <input type="password" defaultValue={PasswordCheck} onChange={PasswordCheckInputHandler} placeholder='비밀번호를 다시 입력해주세요' />
        </label>
        <div className="validation">{WrongPasswordCheck}</div>

        <label>
          이름
          <input type="text" defaultValue={Name} onChange={NameInputHandler} placeholder="이름을 입력해주세요" />
        </label>
        <div className="validation">{WrongName}</div>

        <div className="Gender">
          성별
          <br />
          <label>
            남성
            <input type="radio" defaultValue="male" checked={Gender === "male"} onChange={GenderInputHandler} />
          </label>
          <label>
            여성
            <input type="radio" defaultValue="female" checked={Gender === "female"} onChange={GenderInputHandler} />
          </label>
        </div>


        <label>
          이메일
          <input type="email" defaultValue={Email} onChange={EmailInputHandler} placeholder='이메일을 입력해주세요' />
        </label>
        <div className="validation">{WrongEmail}</div>

        <label>
          전화번호
          <input type="text" defaultValue={PhoneNumber} onChange={PhoneNumberInputHandler} placeholder='전화번호를 입력해주세요' />
        </label>
        <div className="validation">{WrongPhoneNumber}</div>
        <button onClick={phoneNumberCertification}>인증번호 받기</button>

        {isOpen ?
          <div>
            <input type="text" defaultValue={authnumber} onChange={authnumberInputHandler} />
            <AuthTimer
              openCetification={openCetification}
              ValidationAuthNumber={ValidationAuthNumber}
            />
            <button onClick={authnumberFunction}>인증번호 확인</button>
          </div> : ""}

        <AddressInput
          setAddressFunction={setAddressFunction}
          setZonecodeFunction={setZonecodeFunction}
        />

        <button onClick={accountRegister}>가입</button>
      </form>
    </div>
  )
}
