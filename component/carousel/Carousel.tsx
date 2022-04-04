import { useCallback, useEffect, useRef, useState } from "react"
import carouselStyle from "../../styles/carousel/Carousel.module.css"
import { images } from "./images"
import Image from "next/image"
import { NextPage } from "next"


const Carousel: NextPage = () => {
    const [currentCarousel, setCurrentCarousel] = useState(0)
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


    // function useInterval(callback, delay) {
    //     const savedCallback = useRef();
    //     useEffect(() => {
    //         carouselRef.current = callback
    //     }, [callback])
    //     useEffect(() => {
    //         function tick() {
    //             carouselRef.current()
    //         }
    //         if (delay !== null) {
    //             let id = setInterval(tick, delay)
    //             return () => clearInterval(id)
    //         }
    //     }, [delay])
    // }
    //     function Slider() {
    //         useInterval((, 1000) => {
    //             setCurrentCarousel(currentCarousel => currentCarousel + 1)
    //     })
    // }
    function setSlides() {
        let addedLast = []
        var index = 0
        while (index < 1) {
            addedLast.push(images[index % totalCarousel])
            index++
        }
        return [...images, ...addedLast]
    }
    function getItemIndex(index) {
        index -= 1
        if (index < 0) {
            index += itemSise
        } else if (index >= itemSize) {
            index -= itemSize
        }
        return index
    }

    {
        images.map((slide, slideIndex) => {
            const itemIndex = getItemIndex(slideIndex)
            return (
                <div key={slideIndex}>
                    className={`slder-item ${currentCarousel === slideIndex ? 'current-slide' : ''}`}
                </div>
            )
        })
    }


    useEffect(() => {
        carouselRef.current.style.transition = 'all 0.5s ease-in-out';
        carouselRef.current.style.transform = `translateX(${(-100 / totalCarousel) * (currentCarousel)}%)`
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