import React from "react";
import { Box, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormControl from "@mui/material/FormControl";
import { Formik } from "formik";
import { useState, useEffect } from "react";
import axiosClient from "../axios-client";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
const Filter = () => {
    // State for select options
    const [brands, setBrands] = useState([]);
    const [energies, setEnergies] = useState([]);
    const [caseColors, setCaseColors] = useState([]);
    const [glassMaterials, setGlassMaterials] = useState([]);
    const [straps, setStraps] = useState([]);
    const [waterResistanceLevels, setWaterResistanceLevels] = useState([]);
    const [dialColors, setDialColors] = useState([]);
    const [dialSizes, setDialSizes] = useState([]);
    const [dialShapes, setDialShapes] = useState([]);
    const [watchCollections, setWatchCollections] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosClient.get(
                    "/api/watches/select-options"
                );
                const data = response.data[0];
                setBrands(data.brands);
                setEnergies(data.energies);
                setCaseColors(data.caseColors);
                setGlassMaterials(data.glassMaterials);
                setStraps(data.straps);
                setWaterResistanceLevels(data.waterResistanceLevels);
                setDialColors(data.dialColors);
                setDialSizes(data.dialSizes);
                setDialShapes(data.dialShapes);
                setWatchCollections(data.watchCollections);
            } catch (error) {
                console.error("Error fetching select options", error);
            }
        };

        fetchData();
    }, []);
    const handleFormSubmit = async (data, { resetForm }) => {};
    return (
        <Box>
            <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
                {(formik) => (
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <Accordion
                                sx={{
                                    my: 2,
                                    maxHeight: "400px",
                                    overflow: "scroll",
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography
                                        variant="h5"
                                        color="gray"
                                        fontWeight="bold"
                                    >
                                        Brands
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <FormGroup>
                                        {brands?.map((e) => (
                                            <FormControlLabel
                                                control={<Checkbox />}
                                                label={e.name}
                                            />
                                        ))}
                                    </FormGroup>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                sx={{
                                    my: 2,

                                    maxHeight: "400px",
                                    overflow: "scroll",
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    <Typography
                                        variant="h5"
                                        color="gray"
                                        fontWeight="bold"
                                    >
                                        Energy
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <FormGroup>
                                        {energies?.map((e) => (
                                            <FormControlLabel
                                                control={<Checkbox />}
                                                label={e.name}
                                            />
                                        ))}
                                    </FormGroup>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                sx={{
                                    my: 2,

                                    maxHeight: "400px",
                                    overflow: "scroll",
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    <Typography
                                        variant="h5"
                                        color="gray"
                                        fontWeight="bold"
                                    >
                                        Case Colors
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <FormGroup>
                                        {caseColors?.map((e) => (
                                            <FormControlLabel
                                                control={<Checkbox />}
                                                label={e.name}
                                            />
                                        ))}
                                    </FormGroup>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                sx={{
                                    my: 2,

                                    maxHeight: "400px",
                                    overflow: "scroll",
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    <Typography
                                        variant="h5"
                                        color="gray"
                                        fontWeight="bold"
                                    >
                                        Glass Materials
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <FormGroup>
                                        {glassMaterials?.map((e) => (
                                            <FormControlLabel
                                                control={<Checkbox />}
                                                label={e.name}
                                            />
                                        ))}
                                    </FormGroup>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                sx={{
                                    my: 2,

                                    maxHeight: "400px",
                                    overflow: "scroll",
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    <Typography
                                        variant="h5"
                                        color="gray"
                                        fontWeight="bold"
                                    >
                                        Straps
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <FormGroup>
                                        {straps?.map((e) => (
                                            <FormControlLabel
                                                control={<Checkbox />}
                                                label={e.name}
                                            />
                                        ))}
                                    </FormGroup>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                sx={{
                                    my: 2,

                                    maxHeight: "400px",
                                    overflow: "scroll",
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    <Typography
                                        variant="h5"
                                        color="gray"
                                        fontWeight="bold"
                                    >
                                        Water Resistance Level
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <FormGroup>
                                        {waterResistanceLevels?.map((e) => (
                                            <FormControlLabel
                                                control={<Checkbox />}
                                                label={e.name}
                                            />
                                        ))}
                                    </FormGroup>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                sx={{
                                    my: 2,

                                    maxHeight: "400px",
                                    overflow: "scroll",
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    <Typography
                                        variant="h5"
                                        color="gray"
                                        fontWeight="bold"
                                    >
                                        Dial Colors
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <FormGroup>
                                        {dialColors?.map((e) => (
                                            <FormControlLabel
                                                control={<Checkbox />}
                                                label={e.name}
                                            />
                                        ))}
                                    </FormGroup>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                sx={{
                                    my: 2,

                                    maxHeight: "400px",
                                    overflow: "scroll",
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    <Typography
                                        variant="h5"
                                        color="gray"
                                        fontWeight="bold"
                                    >
                                        Dial Sizes
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <FormGroup>
                                        {dialSizes?.map((e) => (
                                            <FormControlLabel
                                                control={<Checkbox />}
                                                label={e.name}
                                            />
                                        ))}
                                    </FormGroup>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                sx={{
                                    my: 2,

                                    maxHeight: "400px",
                                    overflow: "scroll",
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    <Typography
                                        variant="h5"
                                        color="gray"
                                        fontWeight="bold"
                                    >
                                        Dial Shapes
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <FormGroup>
                                        {dialShapes?.map((e) => (
                                            <FormControlLabel
                                                control={<Checkbox />}
                                                label={e.name}
                                            />
                                        ))}
                                    </FormGroup>
                                </AccordionDetails>
                            </Accordion>

                            <Accordion
                                sx={{
                                    my: 2,
                                    maxHeight: "400px",
                                    overflow: "scroll",
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    <Typography
                                        variant="h5"
                                        color="gray"
                                        fontWeight="bold"
                                    >
                                        Collections
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <FormGroup>
                                        {watchCollections?.map((e) => (
                                            <FormControlLabel
                                                control={<Checkbox />}
                                                label={e.name}
                                            />
                                        ))}
                                    </FormGroup>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

export default Filter;

const initialValues = {
    name: "",
    brand_id: "",
    gender: "",
    price: "",
    strap_id: "",
    water_resistance_level_id: "",
    case_color_id: "",
    dial_color_id: "",
    dial_size_id: "",
    dial_shape_id: "",
    glass_material_id: "",
    energy_id: "",
    watch_collection_id: "",
};
