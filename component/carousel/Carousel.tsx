import { useCallback, useEffect, useRef, useState } from "react"
import carouselStyle from "../../styles/carousel/Carousel.module.css"
import { images } from "./images"
import Image from "next/image"
import { NextPage } from "next"


const Carousel: NextPage = () => {
    const [currentCarousel, setCurrentCarousel] = useState(0)
    const [pickers, setpickers] = useState<JSX.Element[]>([])
    const carouselRef = useRef(null)
    const totalCarousel = images.length

    const prevCarousel = useCallback((): void => {
        if (currentCarousel <= 0) {
            setCurrentCarousel(totalCarousel - 1)
            return;
        }
        setCurrentCarousel(currentCarousel - 1)
    }, [currentCarousel])

    const nextCarousel = useCallback((): void => {
        if (currentCarousel + 1 === totalCarousel) {
            setCurrentCarousel(0)
            return;
        }
        setCurrentCarousel(currentCarousel + 1)
    }, [currentCarousel])


    useEffect(() => {
        console.log(carouselRef.current)
        carouselRef.current.style.transition = 'all 0.5s ease-in-out';
        carouselRef.current.style.transform = `translateX(-${currentCarousel * 20}%)`; // 백틱을 사용하여 슬라이드로 이동하는 에니메이션을 만듭니다.
    }, [currentCarousel]);
    return (
        <div className={carouselStyle.container} >
            <div className={carouselStyle.carousel_container} >
                <div className={carouselStyle.slideimage} ref={carouselRef} >
                    {images.map((image) => <Image src={image} />)}
                </div>
            </div>
            <button className={carouselStyle.prev_btn} onClick={prevCarousel}>뒤로버튼</button>
            <button className={carouselStyle.next_btn} onClick={nextCarousel}>앞으로버튼</button>

        </div>
    )
}

export default Carousel