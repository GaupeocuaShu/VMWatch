import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "../swiper.css";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import { Box } from "@mui/material";
import { watches } from "../constants";
import ThumbBanner from "./ThumbBanner";
const exampleWatch = watches[0];
export default function ProductDetailGallery() {
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
                <SwiperSlide>
                    <ThumbBanner src={exampleWatch.frontImage} />
                </SwiperSlide>
                <SwiperSlide>
                    <ThumbBanner src={exampleWatch.backImage} />
                </SwiperSlide>
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
                <SwiperSlide>
                    <ThumbBanner src={exampleWatch.frontImage} />
                </SwiperSlide>
                <SwiperSlide>
                    <ThumbBanner src={exampleWatch.backImage} />
                </SwiperSlide>
            </Swiper>
        </Box>
    );
}
