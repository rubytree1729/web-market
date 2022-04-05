import type { NextPage } from 'next'
import useCustomSWR from '../utils/client/useCustumSWR'
import Layout from '../component/Layout'
import Carousel from '../component/carousel/Carousel'
import ItemList from '../component/index/ItemList'
import styles from '../styles/index.module.css'


function divideBy(data: Array<any>, n: number) {
  const result = []
  for (let i = 0; n * (i + 1) < data.length; i++) {
    result.push(data.slice(n * i, n * (i + 1)))
  }
  return result
}


const Home: NextPage = () => {
  const { data, isLoading, isServerError } = useCustomSWR("/api/product?display=18&byCategory=true")
  if (isLoading) return <div>로딩중...</div>
  if (isServerError) {
    alert("서버 에러가 발생하였습니다")
  }
  if (!data) {
    alert("데이터베이스 에러가 발생하였습니다")
  }
  const dividedData = divideBy(data, 2)
  return (
    <Layout>
      <div className={styles.main}>
        <Carousel></Carousel>
        <div className={styles.mainList}>
          <div className={styles.itemList}>
            {dividedData && dividedData.map(products => <ItemList key={products[0].id} data={products}></ItemList>)}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home
