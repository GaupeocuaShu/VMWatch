import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const WatchesFilter = ({ watches }) => {
    const [isHovered, setIsHovered] = useState(null);

    const handleMouseEnter = (index) => {
        setIsHovered(index);
    };

    const handleMouseLeave = () => {
        setIsHovered(null);
    };
    console.log(isHovered);
    return (
        <Box display="grid" gridTemplateColumns="repeat(12,1fr)" width="80%">
            {watches.map((e, i) => (
                <Box
                    key={i}
                    gridColumn="span 4"
                    sx={{ cursor: "pointer" }}
                    className="hover-unhide-back-image"
                    onMouseEnter={() => handleMouseEnter(i)}
                    onMouseLeave={handleMouseLeave}
                    component={Link}
                    to={`/product/${e.slug}`}
                    display="flex"
                    flexDirection="column"
                >
                    <img
                        src={isHovered === i ? e.thumb : e.front}
                        alt={e.name}
                        style={{ objectFit: "cover" }}
                        className="frontImage"
                    />
                    <Typography
                        variant="h5"
                        mt={1}
                        color="gray"
                        fontWeight="bold"
                    >
                        {e.name} - {e.dialSize} - {e.glassMaterial} -{e.gender}
                    </Typography>
                    <Typography variant="h6" mt={1} color="gray">
                        {e.description}
                    </Typography>
                    <Typography mt={1} variant="h5" fontWeight="bolder">
                        ${e.price}
                    </Typography>
                </Box>
            ))}
        </Box>
    );
};

export default WatchesFilter;
