import type { NextApiResponse, NextPage } from 'next'
import Axios, { AxiosResponse } from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import { getFingerprint, getFingerprintPro, validateToken } from '../../utils/fingerprint'
import { envExist } from '../../utils/validateEnv'
import { axiosConfig } from '../../utils/commonHandler'

const Home: NextPage = (props) => {
  const [id, setId] = useState("")
  const [password, setPassword] = useState("")
  const [persistent, setPersistent] = useState(false)

  const IdInputHandler = (event: any) => {
    setId(event.currentTarget.value)
  }//id 입력감지 후 id 값 변경

  const PasswordInputHandler = (event: any) => {
    setPassword(event.currentTarget.value)
  }

  const persistentInputHandler = (event: any) => {
    setPersistent(prevState => { return !prevState })
  }

  async function login(event: any) {
    event.preventDefault()
    try {
      const key = await getFingerprint()
      const loginQuery: any = { id, password, key, persistent }
      if (persistent) {
        loginQuery["persistent_key"] = await getFingerprintPro()
      }
      await Axios.post("/api/user/login", loginQuery, axiosConfig)
      alert("로그인 성공")
      Router.push("/")
    } catch (error) {
      console.log(error)
      alert("로그인 실패")
    }
  }

  useEffect(() => {
    validateToken()
      .then(value => {
        if (value) {
          alert("이미 로그인 되어 있습니다")
          Router.push("/")
        }
      })
  }, [])
  return (
    <div className='container' style={{ textAlign: "center" }}>
      <form>
        <label>
          ID
          <input type="text" value={id} onChange={IdInputHandler} placeholder="아이디를 입력해주세요" />
        </label>
        <label>
          PW
          <input type="password" value={password} onChange={PasswordInputHandler} placeholder='비밀번호를 입력해주세요' />
        </label>
        <label >
          로그인 유지
          <input type="checkbox" onChange={persistentInputHandler} />
        </label>
        <button onClick={login}>로그인</button>
        <button >회원가입</button>
      </form>
    </div>
  )
}

export default Home
