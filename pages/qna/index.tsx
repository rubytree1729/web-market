import Board from "./board"
import Link from "next/link"
import { useRouter } from "next/router"
import useCustomSWR from "../../utils/client/useCustumSWR"
import { NextPage } from "next"

const QnA: NextPage = () => {
    const router = useRouter()
    const { data, isLoading, isApiError, isServerError } = useCustomSWR("/api/user/auth")
    if (isLoading) return <div>로딩중...</div>
    if (isServerError) {
        alert("서버 에러가 발생하였습니다")
        router.push("/")
    }
    if (isApiError) {
        alert("로그인이 필요합니다")
        router.push("/login")
    }
    return (
        <div className="container">
            <div className="header">
            </div>
            <div className="body">
                <Board></Board>
                <br />
                <Link href={"/qna/createpost"} passHref>
                    <button>글쓰기</button>
                </Link>
            </div>
            <div className="footer">
            </div>
        </div>
    )
}

export default QnA