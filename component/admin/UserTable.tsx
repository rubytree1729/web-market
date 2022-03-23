import type { NextPage } from 'next'

const Column: NextPage = ({ children }) => {
    return (
        <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
        </tr>)
}


const Userlist: NextPage = ({ children }) => {
    console.log(children)
    if (!Array.isArray(children))
        return (
            <>
            </>)
    return (
        <>
            <div className='container'>
                <div className='table-responsive'>
                    <table className="table align-middle text-center table-striped table-hover table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">가입날짜</th>
                                <th scope="col">아이디</th>
                                <th scope="col">이름</th>
                                <th scope="col">이메일</th>
                                <th scope="col">주소</th>
                                <th scope="col">휴대폰번호</th>
                                <th scope="col">권한</th>
                                <th scope="col">체크</th>
                            </tr>
                        </thead>
                        <tbody>
                            {children.map(rows =>
                                <tr>
                                    {Object.values(rows).map((row: any) => <td>{row}</td>)}
                                    <td>
                                        <input className="form-check-input" type="checkbox" id="checkboxNoLabel" value="" />
                                    </td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </>

    )
}

export default Userlist