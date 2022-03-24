import { NextPage } from "next";
import Router from "next/router";
import { useEffect, useState } from "react";
import { clientAuth } from "../../utils/client/fingerprint";

const LoginAuth: NextPage = (props: any) => {
    const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
        clientAuth()
            .then(value => {
                if (value) {
                    setIsLogin(true)
                } else {
                    alert("로그인이 필요합니다")
                    Router.push("/login")
                }
            })
    }, [])
    return isLogin ?
        (<>
            {props.children}

        </>)
        :
        (<>
            <div>
                loading...
            </div>
        </>)
}

export default LoginAuth
