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
export default function UpdatePost(post: any) {
    return (
        <>
            <Link href="/qna/createpost/" passHref>
                <button>수정</button>
            </Link>
        </>
    )
}