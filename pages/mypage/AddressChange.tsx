import axios from "axios"
import AddressInput from "../../component/address/AddressInput"
import { useState, useRef } from "react"
export default function Addresschange() {
    const [Zonecode, setZonecode] = useState(''); // 우편번호
    const [Address, setAddress] = useState(''); // 주소
    const [AddressDetail, setAddressDetail] = useState(''); // 상세주소
    const [Validationaddress, setvalidationaddress] = useState(false)

    async function addressPost() {
        try {
            const request = await axios.post("", {
                "fulladdress": {
                    "Zonecode": Zonecode,
                    "Address": Address,
                    "AddressDetail": AddressDetail
                }
            })
            console.log(request.data)
            return request.data
        } catch (err) {
            console.log(err)
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
        <div className="container">
            <div>
                <AddressInput
                    setAddressFunction={setAddressFunction}
                    setZonecodeFunction={setZonecodeFunction}
                />
            </div>
            <button onClick={addressPost}>주소변경하기</button>
        </div>
    )
}