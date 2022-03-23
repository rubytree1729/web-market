import { useEffect, useState } from "react"
import customAxios from "../../utils/customAxios"
import Post from "./Post"

export default function Board() {
    const [posts, setPost] = useState({ post: "" })
    async function getQnaPosts() {
        const res = await customAxios.get("/api/qaboard")
        const data = res.data
        console.log(data)
        return setPost({ post: data })
    }
    let postlist: any = []
    //posts 잘라서 postlist에 넣어서 map해서 화면에 띄우기

    useEffect(() => {
        getQnaPosts
    }, [])
    return (
        <form >
            <div className="container">
                <div className="header">

                </div>
                <div className="body">
                    <div className="t_body">
                        <table>
                            <thead>
                                <tr>
                                    <th>번호</th>
                                    <th>답변여부</th>
                                    <th>구분</th>
                                    <th>내용</th>
                                    <th>작성자</th>
                                    <th>등록일자</th>
                                </tr>
                            </thead>
                            <tbody>
                                {postlist && postlist.map((post: string) => {
                                    <Post {...post} />
                                })}
                            </tbody>
                        </table>
                    </div>

                </div>
                <div className="footer">

                </div>
            </div>
        </form>

    )

}