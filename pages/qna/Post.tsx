export default function Post(post: any) {
    return (
        <>
            <tr>
                <td>{post.qaid}</td>
                <td>{post.answer}</td>
                <td>{post.qacategory}</td>
                <td>{post.title}</td>
                <td>{post.content}</td>
                <td>{post.userid}</td>
                <td>{post.date}</td>
            </tr>

        </>
    )
}