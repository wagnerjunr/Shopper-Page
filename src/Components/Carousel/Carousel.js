import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import Item from '../Item/product'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './carousel.css'


const Carousel = (props) => {

    const [slide, setSlide] = useState();

    useEffect(() => {
        changeHandle()
        window.addEventListener("resize", changeHandle);

        return () => {
            window.removeEventListener("resize", changeHandle);
        };
    }, [])

    function changeHandle() {
        if (window.innerWidth <= 630) {
            setSlide(2);
            if (window.innerWidth <= 330) {
                setSlide(1);
            }
        } else {
            setSlide(4);
        }
    }

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: slide,
        slidesToScroll: 1,
    };
    return (
        <div>
        <Slider {...settings}>
            {props.products && props.products.length > 0 ? (
                props.products.map(item => (
                    <div key={item.id} className='carousel'>
                        <Item product={item} />
                    </div>
                ))
            ) : (
                [...Array(4)].map((_, index) => (
                    <div key={index} className='carousel'>
                        <Skeleton height={300} width="100%" />
                    </div>
                ))
            )}
        </Slider>
        </div>
    )
}

export default Carousel
