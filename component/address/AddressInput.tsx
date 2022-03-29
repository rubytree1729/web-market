import { useState, useRef } from "react"
import DaumPost from "./DaumPost";
import addressStyle from "../../styles/address/address.module.css"

export default function AddressInput(props: any) {
  const [zonecode, setZonecode] = useState(''); // 우편번호
  const [address, setAddress] = useState(''); // 주소
  const [addressDetail, setAddressDetail] = useState(''); // 상세주소
  const [wrongaddressDetail, setwrongAddressDetail] = useState(''); // 상세주소
  const [isOpenPost, setIsOpenPost] = useState(false);
  const [validationaddress, setvalidationaddress] = useState(false)

  const opendaumPost = (event: any) => {
    event.preventDefault()
    setIsOpenPost(!isOpenPost)
  }

  const getAddress = (value: any) => {
    props.setAddressFunction(value)
    setAddress(value)
  }
  const getZonecode = (value: any) => {
    props.setZonecodeFunction(value)
    setZonecode(value)

  }

  return (
    <div className={addressStyle.addressform}>
      <label>
        주소
      </label>
      <div className={addressStyle.addressinput}>
        <input className={addressStyle.input} type="text" id="zonecode" defaultValue={zonecode} placeholder="우편번호" />
        <button type="button" onClick={opendaumPost} defaultValue="우편번호 찾기">주소검색</button><br />
      </div>
      <input className={addressStyle.input} type="text" id="address" defaultValue={address} placeholder="주소" />


      {isOpenPost ?
        <div>
          <DaumPost
            setAddressFunction={getAddress}
            setZonecodeFunction={getZonecode}
          />
        </div> : ""}

    </div>
  )

}

