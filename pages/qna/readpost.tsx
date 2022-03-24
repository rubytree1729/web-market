import DeletePost from "./deletepost"
import UpdatePost from "./updatepost"
import postrowStyle from "../../styles/post/postrow.module.css"
import { useState } from "react"
import postrow from "../../styles/post/postrow.module.css"
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
            console.log(isAnswer)
            setIsOpen(!isOpen)
            setisAnswer(!isAnswer)
        } else {
            setIsOpen(!isOpen)
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
                    <UpdatePost {...post} />
                    <DeletePost {...post} />
                </td>
            </tr>
            {isOpen ? (
                <tr>
                    <td></td>
                    <td></td>
                    <td>{post.content}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            ) : <></>}
            {isAnswer ? (
                <tr>
                    <td></td>
                    <td>답변</td>
                    <td>답변내용</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            ) : <></>}
        </>
    )
}