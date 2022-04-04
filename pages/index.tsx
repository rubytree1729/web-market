import type { NextPage } from 'next'
import MainBody from '../component/index/mainBody'
import useCustomSWR from '../utils/client/useCustumSWR'
import Layout from '../component/layout'


const Home: NextPage = () => {
  const { data, isLoading, isServerError } = useCustomSWR("/api/product/search?display=18&byCategory=true")
  if (isLoading) return <div>로딩중...</div>
  if (isServerError) {
    alert("서버 에러가 발생하였습니다")
  }
  if (!data) {
    alert("데이터베이스 에러가 발생하였습니다")
  }
  return (
    <Layout>
      <MainBody {...data}></MainBody>
    </Layout>
  )
}

export default Home
