import React from 'react'
import Slider from 'react-slick'
import jsCookie from "js-cookie";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'
import { useEffect } from 'react';
import { useState } from 'react';


// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper";

export default function HomeOffersCarousel() {
  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1
  // };

  const jwtToken = jsCookie.get("jwt_token");
  const OFFERS_URL = "https://apis.ccbp.in/restaurants-list/offers";
  const [offersArr, setOffersArr] = useState([]);

  useEffect(() => {
    const dataFetch = async () => {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };


      const response = await fetch(OFFERS_URL, options);
      if(response.ok === true) {
        const data = await response.json()
        let spareArr = []
        for(let i of data.offers) {
          spareArr.push(i.image_url);
        }
        setOffersArr(spareArr);
      }
    }
    dataFetch();
  }, []);
      
  return (
    <div>
      <Swiper
        slidesPerView={1}
        spaceBetween={6}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img className="carousel-image" src={offersArr[0]} alt="Jammu Special" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="carousel-image" src={offersArr[1]} alt="Rajasthani Special"/>
        </SwiperSlide>
        <SwiperSlide>
          <img className="carousel-image" src={offersArr[2]} alt="UttaraPradesh Special"/>
        </SwiperSlide>
        <SwiperSlide>
          <img className="carousel-image" src={offersArr[3]} alt="North Indian Special"/>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}



{/* <div className='main-cont'>
      <Slider className='sli' {...settings}>
        <div>
          <img className="carousel-image" src={offersArr[0]} alt="Jammu Special" />
        </div>
        <div>
          <img className="carousel-image" src={offersArr[1]} alt="Rajasthani Special"/>
        </div>
        <div>
          <img className="carousel-image" src={offersArr[2]} alt="UttaraPradesh Special"/>
        </div>
        <div>
          <img className="carousel-image" src={offersArr[3]} alt="North Indian Special"/>
        </div>
      </Slider>
    </div> */}