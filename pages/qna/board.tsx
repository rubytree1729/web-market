import useSWR from "swr"
import axios from "axios"
import ReadPost from "./readpost"
import useCustomSWR from "../../utils/client/useCustumSWR"

export default function Board() {
    let postlist: any = []

    const { data, isLoading, isError } = useCustomSWR("/api/qaboard")
    if (isError) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    for (let post of data) {
        postlist.push(post)
    }
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
                                    <th>구분</th>
                                    <th>제목</th>
                                    <th>작성자</th>
                                    <th>등록일자</th>
                                    <th>답변여부</th>
                                </tr>
                            </thead>
                            <tbody>
                                {postlist && postlist.map((post: any) =>
                                    <ReadPost key={post.qaid}{...post} />)}
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