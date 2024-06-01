import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import useMediaQuery from "@mui/material/useMediaQuery";

const BannerGallery = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    return (
        <Box margin={matches ? "20px 200px" : "20px 20px"}>
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridTemplateRows={
                    matches ? "repeat(2,300px)" : "repeat(3,300px)"
                }
                gap={3}
            >
                <Box
                    className="hover-zoom"
                    gridColumn={matches ? "span 6" : "span 12"}
                    gridRow={matches ? "span 2" : "span 1"}
                    sx={{ position: "relative", cursor: "pointer" }}
                >
                    <img
                        width="100%"
                        height="100%"
                        style={{ objectFit: "cover", borderRadius: "20px" }}
                        src="../../assets/dragon_watch.avif"
                        alt="dragon_watch"
                    />
                    <Typography
                        variant="h3"
                        textTransform="uppercase"
                        sx={{
                            position: "absolute",
                            color: "white",
                            left: 30,
                            bottom: 40,
                        }}
                    >
                        Dragon Watch
                    </Typography>
                    <Typography
                        variant="h6"
                        textTransform="uppercase"
                        color={colors.grey[800]}
                        sx={{
                            position: "absolute",
                            left: 40,
                            bottom: 20,
                        }}
                    >
                        View Now
                    </Typography>
                </Box>

                <Box
                    className="hover-zoom"
                    gridColumn={matches ? "span 3" : "span 6"}
                    sx={{ position: "relative", cursor: "pointer" }}
                >
                    <img
                        width="100%"
                        height="100%"
                        style={{ objectFit: "cover", borderRadius: "20px" }}
                        src="../../assets/man_watch.jpg"
                        alt="femaleWatch"
                    />
                    <Typography
                        variant="h3"
                        textTransform="uppercase"
                        sx={{
                            position: "absolute",
                            color: "white",
                            left: 30,
                            bottom: 40,
                        }}
                    >
                        Man
                    </Typography>
                    <Typography
                        variant="h6"
                        textTransform="uppercase"
                        color={colors.grey[800]}
                        sx={{
                            position: "absolute",
                            left: 30,
                            bottom: 20,
                        }}
                    >
                        View Now
                    </Typography>
                </Box>
                <Box
                    className="hover-zoom"
                    gridColumn={matches ? "span 3" : "span 6"}
                    sx={{ position: "relative", cursor: "pointer" }}
                >
                    <img
                        width="100%"
                        height="100%"
                        style={{ objectFit: "cover", borderRadius: "20px" }}
                        src="../../assets/female_watch.jpg"
                        alt="male_watch"
                    />
                    <Typography
                        variant="h3"
                        textTransform="uppercase"
                        sx={{
                            position: "absolute",
                            color: "white",
                            left: 30,
                            bottom: 40,
                        }}
                    >
                        Woman
                    </Typography>
                    <Typography
                        variant="h6"
                        textTransform="uppercase"
                        color={colors.grey[800]}
                        sx={{
                            position: "absolute",
                            left: 30,
                            bottom: 20,
                        }}
                    >
                        View Now
                    </Typography>
                </Box>
                <Box
                    className="hover-zoom"
                    gridColumn={matches ? "span 6" : "span 12"}
                    sx={{ position: "relative", cursor: "pointer" }}
                >
                    <img
                        height="100%"
                        width="100%"
                        style={{ objectFit: "cover", borderRadius: "20px" }}
                        src="../../assets/couple_watch.jpg"
                        alt="couple_watch"
                    />
                    <Typography
                        variant="h3"
                        textTransform="uppercase"
                        sx={{
                            position: "absolute",
                            color: "white",
                            left: 30,
                            bottom: 40,
                        }}
                    >
                        Couple
                    </Typography>
                    <Typography
                        variant="h6"
                        textTransform="uppercase"
                        color={colors.grey[800]}
                        sx={{
                            position: "absolute",
                            left: 30,
                            bottom: 20,
                        }}
                    >
                        View Now
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default BannerGallery;
