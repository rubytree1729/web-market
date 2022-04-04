import HeaderCompo from "./index/HeaderCompo"
import FooterCompo from "./index/FooterCompo"

export default function Layout({ children }) {
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