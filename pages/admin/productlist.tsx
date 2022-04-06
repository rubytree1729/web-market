import type { NextPage } from 'next'
import useCustomSWR from '../../utils/client/useCustumSWR'
import Layout from '../../component/Layout'
import 'bootstrap/dist/css/bootstrap.css'

const Productlist: NextPage = () => {
    const { data, isLoading, isError } = useCustomSWR("/api/admin/product")
    return (
        <Layout>만드는 중
        </Layout>
    )
}

export default Productlist