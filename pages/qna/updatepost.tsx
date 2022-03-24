import Link from "next/link"
export default function UpdatePost(post: any) {
    // console.log(post)
    console.log(post.qaid)
    return (
        <>
            <Link href="/qna/createpost/[qaid]" as={`/qna/createpost/${post.qaid}`} passHref>
                <button>수정</button>
            </Link>
        </>
    )
}