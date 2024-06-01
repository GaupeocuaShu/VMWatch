import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Banner from "./Banner";
const bannerSRCs = [
    "../../assets/KOI-Noble-PC.jpg",
    "../../assets/neeraj-kumar-watch-banner.jpg",
    "../../assets/dong-ho-limited-edition-phien-ban-gioi-han.avif",
];
export default function SwiperBanner() {
    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Autoplay, Pagination]}
                className="mySwiper"
                style={{ backgroundColor: "#EEEEEE" }}
            >
                {bannerSRCs.map((e, i) => (
                    <SwiperSlide>
                        <Banner src={e} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}
