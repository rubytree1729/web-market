import styles from '../styles/Home.module.css'
import FooterCompo from '../component/index/footerCompo'
import MainBody from '../component/purchase/mainBody'
import HeaderCompo from '../component/index/headerCompo'



const purchase = () => {
    return (
        <>
            <div>
                <header>
                    <HeaderCompo/>
                </header>

                <main>
                    <MainBody/>
                </main>

                <footer>
                    <FooterCompo/>
                </footer>

            </div>
        </>
    )
}
export default purchase