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
    console.log(post)
    async function deleteApi(event: any) {
        event.preventDefault()
        try {
            const res = await customAxios.delete("/api/qaboard", post)
            if (res.status == 200) {
                alert('문의가 삭제되었습니다.')
            } else {
                alert('글이 존재하지 않습니다.')
            }

        } catch (err) {
            console.log(err)
            alert('삭제가 실패했습니다..')
        }
    }
    function handler(event: any) {
        event.cu
    }
    return (
        <>
            <button onClick={handler}>삭제</button>
        </>
    )
}