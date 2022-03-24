import Link from "next/link";
import { useRouter } from 'next/router'
import { useEffect } from "react";
import { validateToken } from "../../utils/fingerprint";
export default function MyPage() {
    const router = useRouter();


    useEffect(() => {
        validateToken()
            .then(value => {
                console.log(value)
                if (!value) {
                    alert("로그인이 필요한 페이지입니다.")
                    router.push("/login")
                } else {
                    console.log("로그인 됨")
                }
            }).catch(console.log)
    }, [])

    return (
        <div>
            <div>
                <a onClick={() => router.push('/mypage/passwordchange')}>비밀번호 변경</a >
            </div>

            <div>
                <a onClick={() => router.push('/mypage/addresschange')}>주소 변경</a >
            </div>
        </div>
    )
}
