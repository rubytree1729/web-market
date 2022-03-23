import styles from '../../styles/purchaseMain.module.css'

function count(props: any) 
{

}

function Before(porps: any) 
{
    return (
        <div className={styles.before}></div>
    )
}

function Before2(porps: any) 
{
    return (
        <div className={styles.before2}></div>
    )
}

const MainBody = () => 
{
    return (
        <div className={styles.container}>
            <div className={styles.purchaseList}>
                <div className={styles.itemImage}>상품이미지</div>
                <div className={styles.purchasePart}>
                    <div>
                        <div className={styles.itemName}>제품이름</div>
                        <div className={styles.price}>가격</div>
                    </div>
                    <div className={styles.countList}>
                        <div className={styles.countName}>수량</div>
                        <div className={styles.total}>
                            <div className={styles.countBut}>
                                <button className={styles.count}>-</button>
                                <div className={styles.count}>0</div>
                                <button className={styles.count}>+</button>
                            </div>
                            <div className={styles.sumPrice}>금액</div>
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
                            <div>총수량 0개</div>
                            <div>{<Before2></Before2>}총 금액 0원</div>
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
    )
}
export default MainBody