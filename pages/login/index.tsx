import type { NextApiResponse, NextPage } from 'next'
import 'bootstrap/dist/css/bootstrap.css'
import { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import { getFingerprint, clientAuth } from '../../utils/client/fingerprint'
import customAxios from '../../utils/customAxios'
import Link from 'next/link'
import loginStyle from '../../styles/login/login.module.css'
import { loginQuery } from '../api/user/login'

const Home: NextPage = (props) => {
  const [isLogin, setIsLogin] = useState(true)
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
      const fingerprint = await getFingerprint()
      const loginQuery: loginQuery = { id, password, fingerprint, persistent }
      const res = (await customAxios.post("/api/user/login", loginQuery))
      if (res.status == 200) {
        localStorage.
          alert("로그인 성공")
        Router.push("/")
      } else {
        alert("로그인 실패")
      }
    } catch (error) {
      console.log(error)
      alert("로그인 실패")
    }
  }
  useEffect(() => {
    clientAuth()
      .then(value => {
        if (value) {
          alert("이미 로그인 되어 있습니다")
          Router.push("/")
        } else {
          setIsLogin(false)
        }
      })
  }, [])
  return isLogin ? (<div>
    로그인 체크중입니다...
  </div>)
    : (
      <div className={loginStyle.container}>
        <div className={loginStyle.content}>
          <form>
            <div className={loginStyle.login_wrap}>
              <h2 className={loginStyle.login}>로그인</h2>
              <div className={loginStyle.id_pw_wrap}>
                <label>
                  {/* ID */}
                  <input type="text" value={id} onChange={IdInputHandler} placeholder="아이디" />
                </label>
                <label>
                  {/* PW */}
                  <input type="password" value={password} onChange={PasswordInputHandler} placeholder='비밀번호' />
                </label>
              </div>
              <div className={loginStyle.keep_login}>
                <label >
                  <span>로그인 유지</span>
                  <input type="checkbox" onChange={persistentInputHandler} />
                </label>
              </div>
              <div className={loginStyle.login_btn}>
                <button onClick={login}>로그인</button>
              </div>
              <div className={loginStyle.signup_btn}>
                <Link href="/signup" passHref>
                  <span>회원가입</span>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
}

export default Home
