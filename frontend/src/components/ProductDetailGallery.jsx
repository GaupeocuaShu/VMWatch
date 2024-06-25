import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "../swiper.css";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import { Box } from "@mui/material";
import ThumbBanner from "./ThumbBanner";
export default function ProductDetailGallery({ galleries }) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    return (
        <Box className="product-detail-gallery">
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
                thumbs={{
                    swiper:
                        thumbsSwiper && !thumbsSwiper.destroyed
                            ? thumbsSwiper
                            : null,
                }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
            >
                {galleries?.map((e) => (
                    <SwiperSlide>
                        <ThumbBanner src={e.banner} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                {galleries?.map((e) => (
                    <SwiperSlide>
                        <ThumbBanner src={e.banner} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );
}
