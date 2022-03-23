import { useState } from "react"
import Post from "./writepost"
import Board from "./board"
import Link from "next/link"
import LoginAuth from "../../component/auth/LoginAuth"

export default function QnA() {
    return (
        <LoginAuth>
            <div className="container">
                <div className="header">

                </div>
                <div className="body">
                    <Board></Board>
                    <br />
                    <Link href={"/qna/writepost"} passHref>
                        <button>글쓰기</button>
                    </Link>
                </div>
                <div className="footer">

                </div>
            </div>
        </LoginAuth>


    )

}