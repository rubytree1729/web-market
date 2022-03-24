import Link from "next/link"
export default function UpdatePost(post: any) {
    return (
        <>
            <Link href="/qna/createpost/" passHref>
                <button>수정</button>
            </Link>
        </>
    )
}