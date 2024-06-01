import React from "react";
import { Box, TextField, Typography, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
const Collection = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    return (
        <Box
            margin={matches ? "20px 200px" : "20px 20px"}
            boxSizing="border-box"
        >
            <Box
                display="grid"
                justifyContent="space-between"
                gridTemplateColumns="repeat(12, 1fr)"
                gap={4}
            >
                <Box
                    gridColumn={matches ? "span 3" : "span 12"}
                    sx={{ cursor: "pointer" }}
                    className="hover-zoom"
                >
                    <img
                        alt="collection"
                        src="../../assets/BST-dong-ho-nam-ban-chay.avif"
                        width="100%"
                        style={{ objectFit: "cover", borderRadius: "20px" }}
                    />
                    <Typography
                        mt={1}
                        variant="h6"
                        textAlign="center"
                        textTransform="uppercase"
                        color="gray"
                    >
                        Best Seller Man Collection
                    </Typography>
                </Box>
                <Box
                    gridColumn={matches ? "span 3" : "span 12"}
                    sx={{ cursor: "pointer" }}
                    className="hover-zoom"
                >
                    <img
                        alt="collection"
                        width="100%"
                        src="../../assets/BST-dong-ho-nu-ban-chay.avif"
                        style={{ objectFit: "cover", borderRadius: "20px" }}
                    />
                    <Typography
                        mt={1}
                        variant="h6"
                        textAlign="center"
                        color="gray"
                        textTransform="uppercase"
                    >
                        Best Seller Woman Collection
                    </Typography>
                </Box>
                <Box
                    gridColumn={matches ? "span 3" : "span 12"}
                    sx={{ cursor: "pointer" }}
                    className="hover-zoom"
                >
                    <img
                        alt="collection"
                        width="100%"
                        src="../../assets/trang-suc-nu-ban-chay.avif"
                        style={{ objectFit: "cover", borderRadius: "20px" }}
                    />
                    <Typography
                        mt={1}
                        variant="h6"
                        textAlign="center"
                        color="gray"
                        textTransform="uppercase"
                    >
                        Best Seller Man Collection
                    </Typography>
                </Box>
                <Box
                    gridColumn={matches ? "span 3" : "span 12"}
                    sx={{ cursor: "pointer" }}
                    className="hover-zoom"
                >
                    <img
                        alt="collection"
                        width="100%"
                        src="../../assets/bst-dong-ho-moi.avif"
                        style={{ objectFit: "cover", borderRadius: "20px" }}
                    />
                    <Typography
                        mt={1}
                        variant="h6"
                        textAlign="center"
                        color="gray"
                        textTransform="uppercase"
                    >
                        Best Seller New Collection
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Collection;
