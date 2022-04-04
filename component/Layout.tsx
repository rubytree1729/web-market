import HeaderCompo from "./index/HeaderCompo"
import FooterCompo from "./index/FooterCompo"
import { NextPage } from "next"

const Layout: NextPage = ({ children }) => {
    return (
        <div>
            <header>
                <HeaderCompo></HeaderCompo>
            </header>
            <main>{children}</main>
            <footer>
                <FooterCompo></FooterCompo>
            </footer>
        </div>
    )
}

export default Layout