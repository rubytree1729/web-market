import type { NextPage } from 'next'
import useCustomSWR from '../../utils/client/useCustumSWR'
import Layout from '../../component/Layout'
import 'bootstrap/dist/css/bootstrap.css'
import adminStyle from '../../styles/admin/admin.module.css'
import Sidebar from '../../component/admin/Sidebar'

const Productlist: NextPage = () => {
    const { data, isLoading, isError } = useCustomSWR("/api/admin/product")
    return (
        <Layout>
            <div className={adminStyle.container}>
                <div className={adminStyle.body}>
                    <div>
                        <Sidebar toggle="userlist"></Sidebar>
                    </div>
                    <div className={adminStyle.content}>
                        ing...
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Productlist