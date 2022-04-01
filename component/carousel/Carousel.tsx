import { useCallback, useEffect, useRef, useState } from "react"
import carouselStyle from "../../styles/carousel/Carousel.module.css"
import { images } from "./images"
import Image from "next/image"


export default function Carousel() {
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
        carouselRef.current.style.transition = 'all 0.5s ease-in-out';
        carouselRef.current.style.transform = `translateX(-${currentCarousel}00%)`; // 백틱을 사용하여 슬라이드로 이동하는 에니메이션을 만듭니다.
    }, [currentCarousel]);
    return (
        <div className={carouselStyle.container}>
            <button onClick={prevCarousel}></button>
            <div className={carouselStyle.carouse_container}>
                {images.map((image) => {
                    return (
                        <Image
                            src={image}
                        />
                    )
                })}

            </div>

            <button className={carouselStyle.prev_btn} onClick={nextCarousel}></button>

        </div>
    )
}