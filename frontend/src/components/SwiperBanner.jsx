import React, { useRef, useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Banner from "./Banner";
import axiosClient from "../axios-client";
import { Skeleton } from "@mui/material";
export default function SwiperBanner() {
    const [banners, setBanners] = useState([]);
    // Fetch Banner
    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const { data } = await axiosClient.get("api/get-banners");

                setBanners(data.data.sort((a, b) => a.serial - b.serial));
            } catch (error) {
                console.log(error);
            }
        };
        fetchBanners();
    }, []);

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
                {!banners.length ? (
                    <Skeleton
                        variant="rectangular"
                        width="100%"
                        height="400px"
                    />
                ) : (
                    banners.map((e, i) => (
                        <SwiperSlide>
                            <Banner src={e.banner} alt={e.name} />
                        </SwiperSlide>
                    ))
                )}
            </Swiper>
        </>
    );
}
