import { NextPage } from "next"
import { useState } from "react"
import menutoggleStyle from "../../styles/menutoggle/menutoggle.module.css"

const MenuToggle: NextPage = () => {
    const [isToggle, setToggle] = useState(false)
    function togglehandler() {
        setToggle(!isToggle)
    }
    return (
        <div className={menutoggleStyle.container}>
            <div className={menutoggleStyle.hamburger} onClick={togglehandler}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className={isToggle ? menutoggleStyle.sideBarOpen : menutoggleStyle.sideBar}>
                <div className={menutoggleStyle.category}>카테고리</div>
                <div>
                    <div className={menutoggleStyle.menu}>가구</div>
                    <div className={menutoggleStyle.menu}>가전</div>
                    <div className={menutoggleStyle.menu}>건강</div>
                    <div className={menutoggleStyle.menu}>디지털</div>
                    <div className={menutoggleStyle.menu}>도서</div>
                    <div className={menutoggleStyle.menu}>미용</div>
                    <div className={menutoggleStyle.menu}>식품</div>
                    <div className={menutoggleStyle.menu}>생활</div>
                    <div className={menutoggleStyle.menu}>생활편의</div>
                    <div className={menutoggleStyle.menu}>여가</div>
                    <div className={menutoggleStyle.menu}>육아</div>
                    <div className={menutoggleStyle.menu}>인테리어</div>
                    <div className={menutoggleStyle.menu}>출산</div>
                    <div className={menutoggleStyle.menu}>패션의류</div>
                    <div className={menutoggleStyle.menu}>화장품</div>
                </div>
            </div>
        </div >
    )
}

export default MenuToggle