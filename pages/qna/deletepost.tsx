import customAxios from "../../utils/customAxios"
import handler from "../api/admin/auth"
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
export default function DeletePost(post: post) {
    // console.log(post)

    function handler(event: any) {
        event.preventDefault()
    }
    return (
        <>
            <button onClick={handler}>삭제</button>
        </>
    )
}