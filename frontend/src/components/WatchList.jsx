import React from "react";
import { Box, TextField, Typography, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";

const WatchList = (props) => {
    const watches = props.watches.filter((e) => e.gender === props.gender);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    const [isHovered, setIsHovered] = useState(null);
    const handleMouseEnter = (index) => {
        setIsHovered(index);
    };

    const handleMouseLeave = () => {
        setIsHovered(null);
    };
    console.log(isHovered);
    return (
        <Box margin={matches ? "20px 200px" : "20px 20px"}>
            <Typography
                variant="h3"
                textAlign="center"
                textTransform="uppercase"
                color="secondary"
                fontWeight={600}
            >
                Best Seller Watches For {props.gender}
            </Typography>
            <Box
                my={5}
                gap={matches ? 5 : 0}
                display="grid"
                gridTemplateColumns="repeat(12,1fr)"
            >
                {watches.map((e, i) => (
                    <Box
                        key={i}
                        gridColumn={matches ? "span 3" : "span 6"}
                        sx={{ cursor: "pointer" }}
                        className="hover-unhide-back-image"
                        onMouseEnter={() => handleMouseEnter(i)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <img
                            height="70%"
                            width="100%"
                            src={isHovered === i ? e.backImage : e.frontImage}
                            alt={e.name}
                            style={{ objectFit: "cover" }}
                            className="frontImage"
                        />
                        <Typography variant="h5" mt={4} textAlign="center">
                            {e.name} - {e.dial} - {e.crystal} - {e.gender}
                        </Typography>
                        <Typography variant="h4" textAlign="center">
                            {e.price}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default WatchList;
