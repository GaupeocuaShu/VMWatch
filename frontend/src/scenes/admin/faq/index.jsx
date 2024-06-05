import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { Box, useTheme, Typography } from "@mui/material";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
const FAQ = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box m="20px">
            <Header title="FAQ" subtitle="Asked...." />
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreOutlinedIcon />}>
                    <Typography color={colors.greenAccent[500]} variant="h5">
                        Important Question
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Ut explicabo cupiditate ab nam qui veritatis nulla
                        harum nostrum tempore quae quos ex pariatur culpa error
                        voluptatem, minus in! Ad, hic.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreOutlinedIcon />}>
                    <Typography color={colors.greenAccent[500]} variant="h5">
                        Important Question
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Ut explicabo cupiditate ab nam qui veritatis nulla
                        harum nostrum tempore quae quos ex pariatur culpa error
                        voluptatem, minus in! Ad, hic.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreOutlinedIcon />}>
                    <Typography color={colors.greenAccent[500]} variant="h5">
                        2nd Question
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Ut explicabo cupiditate ab nam qui veritatis nulla
                        harum nostrum tempore quae quos ex pariatur culpa error
                        voluptatem, minus in! Ad, hic.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreOutlinedIcon />}>
                    <Typography color={colors.greenAccent[500]} variant="h5">
                        3rd Question
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Ut explicabo cupiditate ab nam qui veritatis nulla
                        harum nostrum tempore quae quos ex pariatur culpa error
                        voluptatem, minus in! Ad, hic.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreOutlinedIcon />}>
                    <Typography color={colors.greenAccent[500]} variant="h5">
                        4th Question
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Ut explicabo cupiditate ab nam qui veritatis nulla
                        harum nostrum tempore quae quos ex pariatur culpa error
                        voluptatem, minus in! Ad, hic.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};
export default FAQ;
