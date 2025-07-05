import React from "react";
import { Box, TextField, Typography, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import { Link } from "react-router-dom";

const WatchList = ({ gender, watches, forSearch = false }) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    const [isHovered, setIsHovered] = useState(null);
    const handleMouseEnter = (index) => {
        setIsHovered(index);
    };
    const handleMouseLeave = () => {
        setIsHovered(null);
    };
    return (
        <Box margin={!forSearch && matches ? "20px 200px" : "20px 20px"}>
            <Box
                my={5}
                gap={matches ? 5 : 0}
                display="grid"
                gridTemplateColumns="repeat(12,1fr)"
            >
                {watches.map((e, i) => (
                    <Box
                        key={i}
                        gridColumn={!forSearch && matches ? "span 3" : "span 4"}
                        sx={{ cursor: "pointer" }}
                        className="hover-unhide-back-image"
                        onMouseEnter={() => handleMouseEnter(i)}
                        onMouseLeave={handleMouseLeave}
                        component={Link}
                        to={`/product/${e.slug}`}
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between"
                        height="100%"
                        width="85̀%"
                    >
                        <Box
                            position="relative"
                            height="300px"
                            width="100%"
                            overflow="hidden"
                        >
                            <img
                                height="100%"
                                width="100%"
                                src={e.front}
                                alt={e.name}
                                style={{
                                    objectFit: "cover",
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    opacity: isHovered === i ? 0 : 1,
                                    transition: "opacity 0.3s ease-in-out",
                                }}
                            />
                            <img
                                height="100%"
                                width="100%"
                                src={e.thumb}
                                alt={e.name}
                                style={{
                                    objectFit: "cover",
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    opacity: isHovered === i ? 1 : 0,
                                    transition: "opacity 0.3s ease-in-out",
                                }}
                            />
                        </Box>
                        <Typography
                            variant="h5"
                            mt={1}
                            textAlign="center"
                            color="gray"
                            textTransform={"capitalize"}
                        >
                            {e.name} - {e.gender} - Size: {e.dialSize} - Glass:{" "}
                            {e.glassMaterial} - Energy: {e.energy}
                        </Typography>
                        <Typography
                            mt={1}
                            variant="h3"
                            textAlign="center"
                            color="secondary"
                            fontWeight="bolder"
                        >
                            ${e.price}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default WatchList;
