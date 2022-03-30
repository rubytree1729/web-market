import styles from '../styles/purchaseMain.module.css'
import FooterCompo from '../component/index/footerCompo'
import HeaderCompo from '../component/index/headerCompo'
import { useState } from 'react'
import axios from 'axios'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (context) => {
    const res = await axios.get(`https://web-market-lsh.vercel.app/api/product/search?id=${context.query.id}`)
    const data = await res.data
    return {
        props: { ...data.result[0] }
    }
}


function Before(porps: any) {
    return (
        <div className={styles.before}></div>
    )
}

function Before2(porps: any) {
    return (
        <div className={styles.before2}></div>
    )
}


const purchase = (props: any) => {
    const [count, setCount] = useState(0)
    const onIncrease = () => setCount(count + 1)
    const onDecrease = () => setCount(count - 1)

    const SumPrice = () => {
        return (
            count * parseInt(props.price)
        )
    }

    return (
        <>
            <div>
                <header>
                    <HeaderCompo />
                </header>

                <main>
                    <div className={styles.container}>
                        <div className={styles.purchaseList}>
                            <img className={styles.itemImage} src={props.imageUrl}></img>
                            <div className={styles.purchasePart}>
                                <div>
                                    <div className={styles.itemName}>{props.name}</div>
                                    <div className={styles.price}>{props.price}원</div>
                                </div>
                                <div className={styles.countList}>
                                    <div className={styles.countName}>수량</div>
                                    <div className={styles.total}>
                                        <div className={styles.countBut}>
                                            <button disabled={count === 0 ? true : false} onClick={onDecrease} className={styles.count}>-</button>
                                            <div className={styles.count}>{count}</div>
                                            <button onClick={onIncrease} className={styles.count}>+</button>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.start}>
                                    <div className={styles.icon}>택배아이콘</div>
                                    <div className={styles.p}>
                                        <div>오늘출발 상품</div>
                                        <div>오늘 13:00시까지 결제 시 오늘 바로 발송됩니다.</div>
                                    </div>
                                </div>
                                <div className={styles.express}>택배배송비:3500원</div>

                                <div className={styles.totalPrice}>
                                    <div>총 상품금액</div>
                                    <div className={styles.totalPrice2}>
                                        <div>총수량 {count}개</div>
                                        <div>{<Before2></Before2>}총 금액 {<SumPrice></SumPrice>}원</div>
                                    </div>
                                </div>
                                <div className={styles.purchaseButton}>
                                    <button className={styles.button}>구매버튼</button>
                                    <div>
                                        <button className={styles.etcMenu}>찜하기</button>
                                        <button className={styles.etcMenu}>장바구니</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ------------------------------상품설명----------------------------------- */}

                        <div className={styles.itemInfo}>
                            <div className={styles.itemTag}>
                                <div className={styles.tagLayout}>
                                    <div>상세정보</div>
                                    <div>{<Before></Before>}상품후기</div>
                                    <div>{<Before></Before>}상푼문의</div>
                                    <div>{<Before></Before>}반품/교환정보</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <footer>
                    <FooterCompo />
                </footer>

            </div>
        </>
    )
}
export default purchase