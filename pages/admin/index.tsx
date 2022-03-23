import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.css'
import HeaderCompo from '../../component/index/headerCompo'
import FooterCompo from '../../component/index/footerCompo'


// export const getServerSideProps: GetServerSideProps = async (context) => {
//     const res = await Axios.get("/api/product/search?display=18&byCategory=true", { baseURL: envExist(process.env.NEXT_PUBLIC_BASE_URL, "next public base url") })
//     const data = await res.data

//     return {

//         props: { ...data.result }
//     }
// }

const Admin: NextPage = (props) => {
    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <HeaderCompo></HeaderCompo>
            <FooterCompo></FooterCompo>
        </div>
    )
}

export default Admin