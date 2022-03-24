import Axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { validateToken } from "../../utils/fingerprint";

export default function Check(event: any) {
    const router = useRouter()
    async function checkLogin() {
        const result = validateToken()
        await result ? router.replace('/') : router.push('/login')

    }
    useEffect(() => {
        checkLogin()
    }, [])
    return <>Check</>
}