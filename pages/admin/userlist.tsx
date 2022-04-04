import type { NextPage } from 'next'
import CheckTable from '../../component/admin/CheckTable'
import { useRouter } from 'next/router'
import useCustomSWR from '../../utils/client/useCustumSWR'
import { useState } from 'react'
import customAxios from '../../utils/customAxios'
import Layout from '../../component/Layout'


const Userlist: NextPage = () => {
    const [checkedUserList, setCheckedUserList] = useState([])
    const router = useRouter()
    const { data, isLoading, isApiError, isServerError } = useCustomSWR("/api/admin/userlist")
    if (isLoading) return <div>로딩중...</div>
    if (isServerError) {
        alert("서버 에러가 발생하였습니다")
        router.push("/")
    }
    if (isApiError) {
        alert("권한이 없습니다")
        router.push("/")
    }
    async function grantPermission() {
        const confirmResult = confirm("정말 권한을 부여하시겠습니까?")
        if (confirmResult) {
            try {
                const res = await customAxios.patch("/api/admin/userlist", { ids: checkedUserList, role: "admin" })
                if (res.status === 200) {
                    alert("권한 부여에 성공하였습니다.")
                } else {
                    alert(`권한 부여에 실패하였습니다. 이유는 아래와 같습니다.
                    ${JSON.stringify(res.data.error)}`)
                }
            } catch (error) {
                alert(`권한 부여 도중 에러가 발생하였습니다. 이유는 아래와 같습니다.
                    ${error}`)
            }
            router.reload()
        }
    }
    async function revokePermission() {
        const confirmResult = confirm("정말 권한을 해제하시겠습니까?")
        if (confirmResult) {
            try {
                const res = await customAxios.patch("/api/admin/userlist", { ids: checkedUserList, role: "user" })
                if (res.status === 200) {
                    alert("권한 해제에 성공하였습니다.")
                } else {
                    alert(`권한 해제에 실패하였습니다. 이유는 아래와 같습니다.
                    ${JSON.stringify(res.data.error)}`)
                }
            } catch (error) {
                alert(`권한 해제 도중 에러가 발생하였습니다. 이유는 아래와 같습니다.
                    ${error}`)
            }
            router.reload()
        }

    }
    async function deleteUser() {
        const confirmResult = confirm("정말 유저을 삭제하시겠습니까?")
        if (confirmResult) {
            try {
                const params = new URLSearchParams();
                checkedUserList.forEach(value => params.append("ids", value))
                const res = await customAxios.delete("/api/admin/userlist", { params })
                if (res.status === 200) {
                    alert("유저 삭제에 성공하였습니다.")
                } else {
                    alert(`유저 삭제에 실패하였습니다. 이유는 아래와 같습니다.
                    ${JSON.stringify(res.data.error)}`)
                }
            } catch (error) {
                alert(`유저 삭제 도중 에러가 발생하였습니다. 이유는 아래와 같습니다.
                    ${error}`)
            }
            router.reload()
        }
    }
    const column = { 가입날짜: "registerAt", 아이디: "id", 이름: "name", 이메일: "email", 주소: "address", 휴대폰번호: "phonenumber", 권한: "role" }
    return (
        <Layout>
            <div className='container'>
                <CheckTable column={column} setCheckedList={setCheckedUserList} index={"id"} data={data}></CheckTable>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button type="button" className="btn btn-outline-success" onClick={grantPermission}>권한부여</button>
                    <button type="button" className="btn btn-outline-warning" onClick={revokePermission}>권한해제</button>
                    <button type="button" className="btn btn-outline-danger" onClick={deleteUser}>회원삭제</button>
                </div>
            </div>
        </Layout>
    )
}

export default Userlist
