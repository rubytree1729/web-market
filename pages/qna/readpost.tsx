import postrowStyle from "../../styles/post/postrow.module.css"
import { useState } from "react"
import postrow from "../../styles/post/postrow.module.css"
import customAxios from "../../utils/customAxios"
import Link from "next/link"
type post = {
    title: string,
    ordernumber: string,
    content: string
    qacategory: string,
    date: number,
    qaid: number,
    _id: number,
    answer: boolean,
    userid: number
}
export default function ReadPost(post: any) {
    const [isOpen, setIsOpen] = useState(false)
    const [isAnswer, setisAnswer] = useState(false)
    let answer = ""
    if (post.answer) {
        answer = "답변완료"

    } else {
        answer = "답변예정"
    }

    function clickContent() {
        if (post.answer) {
            setIsOpen(!isOpen)
            setisAnswer(!isAnswer)
        } else {
            setIsOpen(!isOpen)
        }
    }
    async function deleteApi(event: any) {
        event.preventDefault()
        try {
            const res = await customAxios.delete("/api/qaboard", post.qaid)
            if (res.status == 200) {
                alert('글이 삭제되었습니다.')
            } else {
                alert('글이 존재하지 않습니다.')
            }

        } catch (err) {
            console.log(err)
            alert('삭제가 실패했습니다..')
        }
    }

    return (
        <>
            <tr onClick={clickContent} className={postrowStyle.row}>
                <td>{post.qaid}</td>
                <td>{post.qacategory}</td>
                <td>{post.title}</td>
                <td>{post.userid}</td>
                <td>{post.date.substr(0, 10).replace(/-/g, ".")}</td>
                <td>{answer}</td>
                <td>
                    <Link href={`/qna/updatepost/${post.qaid}`}>
                        <button>수정하기</button>
                    </Link>
                    <button onClick={deleteApi}>삭제</button>
                </td>
            </tr>
            {
                isOpen ? (
                    <tr>
                        <td></td>
                        <td></td>
                        <td>{post.content}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                ) : <></>
            }
            {
                isAnswer ? (
                    <tr>
                        <td></td>
                        <td>답변</td>
                        <td>답변내용</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                ) : <></>
            }
        </>
    )
}