import React from "react";
import { Box } from "@mui/material";
const BannerGallery = () => {
    return (
        <Box margin="20px 200px">
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridTemplateRows="repeat(2,300px)"
                gap={1}
                maxHeight="500px"
            >
                <Box gridColumn="span 6" gridRow="span 2">
                    <img
                        width="100%"
                        height="100%"
                        style={{ objectFit: "cover", borderRadius: "20px" }}
                        src="../../assets/dragon_watch.avif"
                        alt="dragon_watch"
                    />
                </Box>

                <Box gridColumn="span 3">
                    <img
                        width="100%"
                        height="100%"
                        style={{ objectFit: "cover", borderRadius: "20px" }}
                        src="../../assets/man_watch.jpg"
                        alt="femaleWatch"
                    />
                </Box>
                <Box gridColumn="span 3">
                    <img
                        width="100%"
                        height="100%"
                        style={{ objectFit: "cover", borderRadius: "20px" }}
                        src="../../assets/female_watch.jpg"
                        alt="male_watch"
                    />
                </Box>
                <Box gridColumn="span 6">
                    <img
                        height="100%"
                        width="100%"
                        style={{ objectFit: "cover", borderRadius: "20px" }}
                        src="../../assets/couple_watch.jpg"
                        alt="couple_watch"
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default BannerGallery;
