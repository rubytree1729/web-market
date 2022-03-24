import { useEffect, useState } from "react"
import Board from "./board"
import Link from "next/link"
import LoginAuth from "../../component/auth/LoginAuth"
import useSWR from "swr"


export default function QnA() {
    return (
        <LoginAuth>
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
        </LoginAuth>


    )

}