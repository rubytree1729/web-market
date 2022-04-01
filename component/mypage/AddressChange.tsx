import axios from "axios"
import AddressInput from "../../component/address/AddressInput"
import { useState, useRef } from "react"
import addressStyle from "../../styles/address/address.module.css"
import { useRouter } from "next/router";

export default function Addresschange() {
    const [Zonecode, setZonecode] = useState(''); // 우편번호
    const [Address, setAddress] = useState(''); // 주소
    const [AddressDetail, setAddressDetail] = useState(''); // 상세주소
    const [Validationaddress, setvalidationaddress] = useState(false)
    const router = useRouter()

    async function addressPost() {
        try {
            const res = await axios.patch("/api/user/info", {
                "fulladdress": {
                    "zonecode": Zonecode,
                    "address": Address,
                    "addressdetail": AddressDetail
                }
            })
            if (res.status === 200) {
                alert("주소가 변경되었습니다")
                router.push("/mypage")
            } else
                alert("주소변경에 실패했습니다.")

        } catch (err) {
            console.log(err)
        }
    }
    const validatrionAddress = (value: string) => {
        if (value !== "") {
            return true
        } else
            return false

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
    const addressDetailInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const addressDetailValue = event.currentTarget.value
        if (validatrionAddress(addressDetailValue)) {
            setAddressDetail(addressDetailValue)

        }
    }
    return (
        <div className={addressStyle.content}>
            <div>
                <AddressInput
                    setAddressFunction={setAddressFunction}
                    setZonecodeFunction={setZonecodeFunction}
                />
            </div>
            <input className={addressStyle.input} type="text" id="addressDetail" defaultValue={AddressDetail} onChange={addressDetailInputHandler} placeholder="상세주소" />
            <button onClick={addressPost}>주소변경하기</button>
        </div>
    )
}