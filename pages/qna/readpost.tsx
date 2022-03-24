import DeletePost from "./deletepost"
import UpdatePost from "./updatepost"
import postrowStyle from "../../styles/post/postrow.module.css"

export default function ReadPost(post: any) {
    let answer = ""
    if (post.answer) {
        answer = "답변완료"
    } else {
        answer = "답변예정"
    }
    return (
        <>
            <tr className={postrowStyle.row} key={post._id}>
                <td>{post.qaid}</td>
                <td>{answer}</td>
                <td>{post.qacategory}</td>
                <td>{post.title}</td>
                <td>{post.content}</td>
                <td>{post.userid}</td>
                <td>{post.date}</td>
                <td>
                    <UpdatePost {...post} />
                    <DeletePost {...post} />

                </td>
            </tr>
        </>
    )
}