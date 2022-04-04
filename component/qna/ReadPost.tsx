import postrowStyle from "../../styles/post/postrow.module.css"
import { useState } from "react"
import customAxios from "../../utils/customAxios"
import Link from "next/link"
import { NextPage } from "next"
import { qaBoard } from "../../models/QABoard"


const ReadPost: NextPage<{ data: qaBoard }> = ({ data }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isAnswer, setisAnswer] = useState(false)
    const answer = data.answer ? "답변완료" : "답변예정"

    function clickContent() {
        if (data.answer) {
            setisAnswer(!isAnswer)
        }
        setIsOpen(!isOpen)
    }
    async function deleteApi(event: any) {
        event.preventDefault()
        try {
            const res = await customAxios.delete(`/api/qaboard?qaid=${data.qaid}`)
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
                <td>{data.qaid}</td>
                <td>{data.qacategory}</td>
                <td>{data.title}</td>
                <td>{data.userid}</td>
                <td>{data.date.toString().replace(/-/g, ".")}</td>
                <td>{answer}</td>
                <td>
                    <Link href={`/qna/updatepost/${data.qaid}`} passHref>
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
                        <td>{data.content}</td>
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

export default ReadPost