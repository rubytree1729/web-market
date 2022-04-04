import type { NextPage } from 'next'
import 'bootstrap/dist/css/bootstrap.css'
import useCustomSWR from '../../utils/client/useCustumSWR'
import Layout from '../../component/layout'


const Productlist: NextPage = (props) => {
    const { data, isLoading, isError } = useCustomSWR("/api/admin/product")
    return (
        <Layout>만드는 중
        </Layout>
    )
}

export default Productlist