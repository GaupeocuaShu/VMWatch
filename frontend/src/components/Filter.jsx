import React from "react";
import { Box, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Formik } from "formik";
import { useState, useEffect } from "react";
import axiosClient from "../axios-client";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate

const Filter = ({ query, setQuery }) => {
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
    const [initialValues, setInitialValues] = useState({
        name: "",
        brands: [],
        gender: "",
        price: "",
        straps: [],
        water_resistance_levels: [],
        case_colors: [],
        dial_colors: [],
        dial_sizes: [],
        dial_shapes: [],
        glass_materials: [],
        energies: [],
        watch_collections: [],
    });
    const navigate = useNavigate();
    console.log("naviga");

    useEffect(() => {
        const queryParams = {};
        query.forEach((value, key) => {
            queryParams[key] = value.split("|");
        });
        setInitialValues((prevValues) => ({ ...prevValues, ...queryParams }));
    }, []);

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

    const handleFormSubmit = async (values) => {
        const queryParams = new URLSearchParams();
        for (const key in values) {
            if (values[key].length > 0) {
                if (Array.isArray(values[key]))
                    queryParams.append(`${key}`, values[key].join("|"));
                else queryParams.append(`${key}`, values[key]);
            }
        }
        const newUrl = `/search-results?${queryParams.toString()}`;
        console.log(queryParams);
        setQuery(queryParams);
        navigate(newUrl);
    };

    const handleCheckboxChange = (formik, group, value) => {
        const currentValues = formik.values[group];

        if (currentValues.includes(value)) {
            formik.setFieldValue(
                group,
                currentValues.filter((item) => item !== value)
            );
        } else {
            formik.setFieldValue(group, [...currentValues, value]);
        }

        formik.submitForm();
    };
    return (
        <Box>
            <Formik
                initialValues={initialValues}
                onSubmit={handleFormSubmit}
                enableReinitialize
            >
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
                                    slug="panel1-header"
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
                                                control={
                                                    <Checkbox
                                                        checked={formik.values.brands.includes(
                                                            e.slug
                                                        )}
                                                        onChange={() =>
                                                            handleCheckboxChange(
                                                                formik,
                                                                "brands",
                                                                e.slug
                                                            )
                                                        }
                                                    />
                                                }
                                                label={e.name}
                                                key={e.slug}
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
                                    slug="panel2-header"
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
                                                control={
                                                    <Checkbox
                                                        checked={formik.values.energies.includes(
                                                            e.slug
                                                        )}
                                                        onChange={() =>
                                                            handleCheckboxChange(
                                                                formik,
                                                                "energies",
                                                                e.slug
                                                            )
                                                        }
                                                    />
                                                }
                                                label={e.name}
                                                key={e.slug}
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
                                    aria-controls="panel3-content"
                                    slug="panel3-header"
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
                                                control={
                                                    <Checkbox
                                                        checked={formik.values.case_colors.includes(
                                                            e.slug
                                                        )}
                                                        onChange={() =>
                                                            handleCheckboxChange(
                                                                formik,
                                                                "case_colors",
                                                                e.slug
                                                            )
                                                        }
                                                    />
                                                }
                                                label={e.name}
                                                key={e.slug}
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
                                    aria-controls="panel4-content"
                                    slug="panel4-header"
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
                                                control={
                                                    <Checkbox
                                                        checked={formik.values.glass_materials.includes(
                                                            e.slug
                                                        )}
                                                        onChange={() =>
                                                            handleCheckboxChange(
                                                                formik,
                                                                "glass_materials",
                                                                e.slug
                                                            )
                                                        }
                                                    />
                                                }
                                                label={e.name}
                                                key={e.slug}
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
                                    aria-controls="panel5-content"
                                    slug="panel5-header"
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
                                                control={
                                                    <Checkbox
                                                        checked={formik.values.straps.includes(
                                                            e.slug
                                                        )}
                                                        onChange={() =>
                                                            handleCheckboxChange(
                                                                formik,
                                                                "straps",
                                                                e.slug
                                                            )
                                                        }
                                                    />
                                                }
                                                label={e.name}
                                                key={e.slug}
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
                                    aria-controls="panel6-content"
                                    slug="panel6-header"
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
                                                control={
                                                    <Checkbox
                                                        checked={formik.values.water_resistance_levels.includes(
                                                            e.slug
                                                        )}
                                                        onChange={() =>
                                                            handleCheckboxChange(
                                                                formik,
                                                                "water_resistance_levels",
                                                                e.slug
                                                            )
                                                        }
                                                    />
                                                }
                                                label={e.name}
                                                key={e.slug}
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
                                    aria-controls="panel7-content"
                                    slug="panel7-header"
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
                                                control={
                                                    <Checkbox
                                                        checked={formik.values.dial_colors.includes(
                                                            e.slug
                                                        )}
                                                        onChange={() =>
                                                            handleCheckboxChange(
                                                                formik,
                                                                "dial_colors",
                                                                e.slug
                                                            )
                                                        }
                                                    />
                                                }
                                                label={e.name}
                                                key={e.slug}
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
                                    aria-controls="panel8-content"
                                    slug="panel8-header"
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
                                                control={
                                                    <Checkbox
                                                        checked={formik.values.dial_sizes.includes(
                                                            e.slug
                                                        )}
                                                        onChange={() =>
                                                            handleCheckboxChange(
                                                                formik,
                                                                "dial_sizes",
                                                                e.slug
                                                            )
                                                        }
                                                    />
                                                }
                                                label={e.name}
                                                key={e.slug}
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
                                    aria-controls="panel9-content"
                                    slug="panel9-header"
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
                                                control={
                                                    <Checkbox
                                                        checked={formik.values.dial_shapes.includes(
                                                            e.slug
                                                        )}
                                                        onChange={() =>
                                                            handleCheckboxChange(
                                                                formik,
                                                                "dial_shapes",
                                                                e.slug
                                                            )
                                                        }
                                                    />
                                                }
                                                label={e.name}
                                                key={e.slug}
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
                                    aria-controls="panel10-content"
                                    slug="panel10-header"
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
                                                control={
                                                    <Checkbox
                                                        checked={formik.values.watch_collections.includes(
                                                            e.slug
                                                        )}
                                                        onChange={() =>
                                                            handleCheckboxChange(
                                                                formik,
                                                                "watch_collections",
                                                                e.slug
                                                            )
                                                        }
                                                    />
                                                }
                                                label={e.name}
                                                key={e.slug}
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
