import Link from "next/link"
import { useRouter } from "next/router"
import useCustomSWR from "../../../utils/client/useCustumSWR"
import { NextPage } from "next"
import qnaStyle from "../../../styles/mypage/qna.module.css"
import Board from "./Board"


const QnA: NextPage = () => {
    return (
        <div className={qnaStyle.content}>
            <Board></Board>
            <Link href="/mypage/createpost" passHref>
                < button > 글쓰기</button>

            </Link >
        </div >
    )
}

export default QnA