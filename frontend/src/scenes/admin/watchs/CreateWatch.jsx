import React, { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../../components/Header";
import LoadingButton from "@mui/lab/LoadingButton";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import axiosClient from "../../../axios-client";
import ShowSnackbar from "../../../components/SnackBar";

const CreateWatch = () => {
    // Notification --------------------------------
    const [loading, setLoading] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("success");
    const [severity, setSeverity] = useState("");

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
            } catch (error) {
                console.error("Error fetching select options", error);
            }
        };

        fetchData();
    }, []);

    // Notification --------------------------------
    const handleFormSubmit = async (data, { resetForm }) => {
        setLoading(true);
        await axiosClient
            .post("api/watches", data)
            .then(({ data }) => {
                setSeverity("success");
                setSnackBarOpen(true);
                setSnackBarMessage("Create Watch Successfully");
                resetForm();
            })
            .catch(({ response }) => {
                setSeverity("error");
                setSnackBarOpen(true);
                setSnackBarMessage(response.data.message);
            })
            .finally(() => setLoading(false));
    };

    return (
        <Box m="20px">
            <Header
                title="CREATE WATCH"
                subtitle="Create a New Watch "
                action="create"
                router="watch"
            />
            <Formik
                initialValues={initialValues}
                onSubmit={handleFormSubmit}
                validationSchema={validationSchema}
            >
                {(formik) => (
                    <form onSubmit={formik.handleSubmit}>
                        <Box display="flex" flexDirection="column" rowGap={4}>
                            {/* Name */}
                            <TextField
                                type="text"
                                variant="outlined"
                                name="name"
                                label="Name"
                                {...formik.getFieldProps("name")}
                                error={
                                    formik.touched.name && formik.errors.name
                                }
                                helperText={
                                    formik.touched.name && formik.errors.name
                                }
                            />

                            <Box
                                display="flex"
                                justifyContent="space-between"
                                gap={3}
                            >
                                {/* Brand */}
                                <FormControl sx={{ flex: "1" }}>
                                    <InputLabel
                                        error={
                                            formik.touched.brand_id &&
                                            formik.errors.brand_id
                                        }
                                        id="brand_id-label"
                                    >
                                        Brand
                                    </InputLabel>
                                    <Select
                                        labelId="brand_id-label"
                                        id="brand_id"
                                        label="Brand"
                                        defaultValue=""
                                        error={
                                            formik.touched.brand_id &&
                                            formik.errors.brand_id
                                        }
                                        {...formik.getFieldProps("brand_id")}
                                    >
                                        {brands.map((brand) => (
                                            <MenuItem
                                                key={brand.id}
                                                value={brand.id}
                                            >
                                                {brand.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {formik.touched.brand_id && (
                                        <FormHelperText error>
                                            {formik.errors.brand_id}
                                        </FormHelperText>
                                    )}
                                </FormControl>

                                {/* Gender */}
                                <FormControl sx={{ flex: "1" }}>
                                    <InputLabel
                                        error={
                                            formik.touched.gender &&
                                            formik.errors.gender
                                        }
                                        id="gender-label"
                                    >
                                        Gender
                                    </InputLabel>
                                    <Select
                                        labelId="gender-label"
                                        id="gender"
                                        label="Gender"
                                        defaultValue=""
                                        error={
                                            formik.touched.gender &&
                                            formik.errors.gender
                                        }
                                        {...formik.getFieldProps("gender")}
                                    >
                                        <MenuItem value="male">Male</MenuItem>
                                        <MenuItem value="female">
                                            Female
                                        </MenuItem>
                                        <MenuItem value="unisex">
                                            Unisex
                                        </MenuItem>
                                    </Select>
                                    {formik.touched.gender && (
                                        <FormHelperText error>
                                            {formik.errors.gender}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Box>
                            
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                gap={3}
                            >
                                {/* Strap */}
                                <FormControl sx={{ flex: 1 }}>
                                    <InputLabel
                                        error={
                                            formik.touched.strap_id &&
                                            formik.errors.strap_id
                                        }
                                        id="strap_id-label"
                                    >
                                        Strap
                                    </InputLabel>
                                    <Select
                                        labelId="strap_id-label"
                                        id="strap_id"
                                        label="Strap"
                                        defaultValue=""
                                        error={
                                            formik.touched.strap_id &&
                                            formik.errors.strap_id
                                        }
                                        {...formik.getFieldProps("strap_id")}
                                    >
                                        {straps.map((strap) => (
                                            <MenuItem
                                                key={strap.id}
                                                value={strap.id}
                                            >
                                                {strap.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {formik.touched.strap_id && (
                                        <FormHelperText error>
                                            {formik.errors.strap_id}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                                {/* Type */}
                                <FormControl sx={{ flex: 1 }}>
                                    <InputLabel
                                        error={
                                            formik.touched.type &&
                                            formik.errors.type
                                        }
                                        id="type-label"
                                    >
                                        Type
                                    </InputLabel>
                                    <Select
                                        labelId="type-label"
                                        id="type"
                                        label="Type"
                                        defaultValue=""
                                        error={
                                            formik.touched.type &&
                                            formik.errors.type
                                        }
                                        {...formik.getFieldProps("type")}
                                    >
                                        <MenuItem key={0} value="none">
                                            None
                                        </MenuItem>
                                        <MenuItem key={1} value="best_seller">
                                            Best Seller
                                        </MenuItem>
                                        <MenuItem key={2} value="new_arrival">
                                            New Arrival
                                        </MenuItem>
                                    </Select>
                                    {formik.touched.type && (
                                        <FormHelperText error>
                                            {formik.errors.type}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Box>
                            {/* Price */}
                            <TextField
                                type="number"
                                variant="outlined"
                                name="price"
                                label="Price"
                                {...formik.getFieldProps("price")}
                                error={
                                    formik.touched.price && formik.errors.price
                                }
                                helperText={
                                    formik.touched.price && formik.errors.price
                                }
                            />
                            {/* Slug */}
                            <TextField
                                type="text"
                                variant="outlined"
                                name="slug"
                                label="Slug"
                                {...formik.getFieldProps("slug")}
                                error={
                                    formik.touched.slug && formik.errors.slug
                                }
                                helperText={
                                    formik.touched.slug && formik.errors.slug
                                }
                            />
                            {/* Origin */}
                            <TextField
                                type="text"
                                variant="outlined"
                                name="origin"
                                label="Origin"
                                {...formik.getFieldProps("origin")}
                                error={
                                    formik.touched.origin &&
                                    formik.errors.origin
                                }
                                helperText={
                                    formik.touched.origin &&
                                    formik.errors.origin
                                }
                            />

                            <Box
                                display="flex"
                                justifyContent="space-between"
                                gap={3}
                            >
                                {/* Water Resistance Level */}
                                <FormControl sx={{ flex: 1 }}>
                                    <InputLabel
                                        error={
                                            formik.touched
                                                .water_resistance_level_id &&
                                            formik.errors
                                                .water_resistance_level_id
                                        }
                                        id="water_resistance_level_id-label"
                                    >
                                        Water Resistance Level
                                    </InputLabel>
                                    <Select
                                        labelId="water_resistance_level_id-label"
                                        id="water_resistance_level_id"
                                        label="Water Resistance Level"
                                        defaultValue=""
                                        error={
                                            formik.touched
                                                .water_resistance_level_id &&
                                            formik.errors
                                                .water_resistance_level_id
                                        }
                                        {...formik.getFieldProps(
                                            "water_resistance_level_id"
                                        )}
                                    >
                                        {waterResistanceLevels.map((level) => (
                                            <MenuItem
                                                key={level.id}
                                                value={level.id}
                                            >
                                                {level.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {formik.touched
                                        .water_resistance_level_id && (
                                        <FormHelperText error>
                                            {
                                                formik.errors
                                                    .water_resistance_level_id
                                            }
                                        </FormHelperText>
                                    )}
                                </FormControl>
                                {/* Case Color */}
                                <FormControl sx={{ flex: 1 }}>
                                    <InputLabel
                                        error={
                                            formik.touched.case_color_id &&
                                            formik.errors.case_color_id
                                        }
                                        id="case_color_id-label"
                                    >
                                        Case Color
                                    </InputLabel>
                                    <Select
                                        labelId="case_color_id-label"
                                        id="case_color_id"
                                        label="Case Color"
                                        defaultValue=""
                                        error={
                                            formik.touched.case_color_id &&
                                            formik.errors.case_color_id
                                        }
                                        {...formik.getFieldProps(
                                            "case_color_id"
                                        )}
                                    >
                                        {caseColors.map((color) => (
                                            <MenuItem
                                                key={color.id}
                                                value={color.id}
                                            >
                                                {color.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {formik.touched.case_color_id && (
                                        <FormHelperText error>
                                            {formik.errors.case_color_id}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Box>
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                gap={3}
                            >
                                {/* Dial Color */}
                                <FormControl sx={{ flex: "1" }}>
                                    <InputLabel
                                        error={
                                            formik.touched.dial_color_id &&
                                            formik.errors.dial_color_id
                                        }
                                        id="dial_color_id-label"
                                    >
                                        Dial Color
                                    </InputLabel>
                                    <Select
                                        labelId="dial_color_id-label"
                                        id="dial_color_id"
                                        label="Dial Color"
                                        defaultValue=""
                                        error={
                                            formik.touched.dial_color_id &&
                                            formik.errors.dial_color_id
                                        }
                                        {...formik.getFieldProps(
                                            "dial_color_id"
                                        )}
                                    >
                                        {dialColors.map((color) => (
                                            <MenuItem
                                                key={color.id}
                                                value={color.id}
                                            >
                                                {color.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {formik.touched.dial_color_id && (
                                        <FormHelperText error>
                                            {formik.errors.dial_color_id}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                                {/* Dial Size */}
                                <FormControl sx={{ flex: "1" }}>
                                    <InputLabel
                                        error={
                                            formik.touched.dial_size_id &&
                                            formik.errors.dial_size_id
                                        }
                                        id="dial_size_id-label"
                                    >
                                        Dial Size
                                    </InputLabel>
                                    <Select
                                        labelId="dial_size_id-label"
                                        id="dial_size_id"
                                        label="Dial Size"
                                        defaultValue=""
                                        error={
                                            formik.touched.dial_size_id &&
                                            formik.errors.dial_size_id
                                        }
                                        {...formik.getFieldProps(
                                            "dial_size_id"
                                        )}
                                    >
                                        {dialSizes.map((size) => (
                                            <MenuItem
                                                key={size.id}
                                                value={size.id}
                                            >
                                                {size.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {formik.touched.dial_size_id && (
                                        <FormHelperText error>
                                            {formik.errors.dial_size_id}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                                {/* Dial Shape */}
                                <FormControl sx={{ flex: "1" }}>
                                    <InputLabel
                                        error={
                                            formik.touched.dial_shape_id &&
                                            formik.errors.dial_shape_id
                                        }
                                        id="dial_shape_id-label"
                                    >
                                        Dial Shape
                                    </InputLabel>
                                    <Select
                                        labelId="dial_shape_id-label"
                                        id="dial_shape_id"
                                        label="Dial Shape"
                                        defaultValue=""
                                        error={
                                            formik.touched.dial_shape_id &&
                                            formik.errors.dial_shape_id
                                        }
                                        {...formik.getFieldProps(
                                            "dial_shape_id"
                                        )}
                                    >
                                        {dialShapes.map((shape) => (
                                            <MenuItem
                                                key={shape.id}
                                                value={shape.id}
                                            >
                                                {shape.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {formik.touched.dial_shape_id && (
                                        <FormHelperText error>
                                            {formik.errors.dial_shape_id}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Box>
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                gap={3}
                            >
                                {/* Glass Material */}
                                <FormControl sx={{ flex: 1 }}>
                                    <InputLabel
                                        error={
                                            formik.touched.glass_material_id &&
                                            formik.errors.glass_material_id
                                        }
                                        id="glass_material_id-label"
                                    >
                                        Glass Material
                                    </InputLabel>
                                    <Select
                                        labelId="glass_material_id-label"
                                        id="glass_material_id"
                                        label="Glass Material"
                                        defaultValue=""
                                        error={
                                            formik.touched.glass_material_id &&
                                            formik.errors.glass_material_id
                                        }
                                        {...formik.getFieldProps(
                                            "glass_material_id"
                                        )}
                                    >
                                        {glassMaterials.map((material) => (
                                            <MenuItem
                                                key={material.id}
                                                value={material.id}
                                            >
                                                {material.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {formik.touched.glass_material_id && (
                                        <FormHelperText error>
                                            {formik.errors.glass_material_id}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                                {/* Energy */}
                                <FormControl sx={{ flex: 1 }}>
                                    <InputLabel
                                        error={
                                            formik.touched.energy &&
                                            formik.errors.energy
                                        }
                                        id="energy-label"
                                    >
                                        Energy
                                    </InputLabel>
                                    <Select
                                        labelId="energy-label_id"
                                        id="energy_id"
                                        label="Energy"
                                        defaultValue=""
                                        error={
                                            formik.touched.energy &&
                                            formik.errors.energy
                                        }
                                        {...formik.getFieldProps("energy_id")}
                                    >
                                        {energies.map((energy) => (
                                            <MenuItem
                                                key={energy.id}
                                                value={energy.id}
                                            >
                                                {energy.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {formik.touched.energy && (
                                        <FormHelperText error>
                                            {formik.errors.energy}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Box>

                            {/* SKU */}
                            <TextField
                                type="text"
                                variant="outlined"
                                name="sku"
                                label="SKU"
                                {...formik.getFieldProps("sku")}
                                error={formik.touched.sku && formik.errors.sku}
                                helperText={
                                    formik.touched.sku && formik.errors.sku
                                }
                            />
                            {/* Stock Quantity */}
                            <TextField
                                type="number"
                                variant="outlined"
                                name="stock_quantity"
                                label="Stock Quantity"
                                {...formik.getFieldProps("stock_quantity")}
                                error={
                                    formik.touched.stock_quantity &&
                                    formik.errors.stock_quantity
                                }
                                helperText={
                                    formik.touched.stock_quantity &&
                                    formik.errors.stock_quantity
                                }
                            />

                            {/* Weight */}
                            <TextField
                                type="number"
                                variant="outlined"
                                name="weight"
                                label="Weight"
                                {...formik.getFieldProps("weight")}
                                error={
                                    formik.touched.weight &&
                                    formik.errors.weight
                                }
                                helperText={
                                    formik.touched.weight &&
                                    formik.errors.weight
                                }
                            />
                            {/* Warranty */}
                            <TextField
                                type="text"
                                variant="outlined"
                                name="warranty"
                                label="Warranty"
                                {...formik.getFieldProps("warranty")}
                                error={
                                    formik.touched.warranty &&
                                    formik.errors.warranty
                                }
                                helperText={
                                    formik.touched.warranty &&
                                    formik.errors.warranty
                                }
                            />

                            {/* Meta Title */}
                            <TextField
                                type="text"
                                variant="outlined"
                                name="meta_title"
                                label="Meta Title"
                                {...formik.getFieldProps("meta_title")}
                                error={
                                    formik.touched.meta_title &&
                                    formik.errors.meta_title
                                }
                                helperText={
                                    formik.touched.meta_title &&
                                    formik.errors.meta_title
                                }
                            />
                            {/* Meta Description */}
                            <TextField
                                type="text"
                                variant="outlined"
                                name="meta_description"
                                label="Meta Description"
                                {...formik.getFieldProps("meta_description")}
                                error={
                                    formik.touched.meta_description &&
                                    formik.errors.meta_description
                                }
                                helperText={
                                    formik.touched.meta_description &&
                                    formik.errors.meta_description
                                }
                            />

                            {/* Meta Keywords */}
                            <TextField
                                type="text"
                                variant="outlined"
                                name="meta_keywords"
                                label="Meta Keywords"
                                {...formik.getFieldProps("meta_keywords")}
                                error={
                                    formik.touched.meta_keywords &&
                                    formik.errors.meta_keywords
                                }
                                helperText={
                                    formik.touched.meta_keywords &&
                                    formik.errors.meta_keywords
                                }
                            />
                            {/* Release Date */}
                            <TextField
                                type="date"
                                variant="outlined"
                                name="release_date"
                                label="Release Date"
                                {...formik.getFieldProps("release_date")}
                                error={
                                    formik.touched.release_date &&
                                    formik.errors.release_date
                                }
                                helperText={
                                    formik.touched.release_date &&
                                    formik.errors.release_date
                                }
                            />

                            {/* Description */}
                            <TextField
                                type="text"
                                variant="outlined"
                                name="description"
                                label="Description"
                                {...formik.getFieldProps("description")}
                                error={
                                    formik.touched.description &&
                                    formik.errors.description
                                }
                                helperText={
                                    formik.touched.description &&
                                    formik.errors.description
                                }
                            />
                            <Box display="flex" justifyContent="end" gap={3}>
                                <Button
                                    onClick={formik.handleReset}
                                    variant="outlined"
                                    size="large"
                                    endIcon={<RestartAltOutlinedIcon />}
                                >
                                    Reset
                                </Button>
                                <LoadingButton
                                    size="large"
                                    loading={loading}
                                    endIcon={<CheckCircleOutlineOutlinedIcon />}
                                    color="blue"
                                    type="submit"
                                    variant="outlined"
                                    loadingPosition="center"
                                >
                                    Create
                                </LoadingButton>
                            </Box>
                        </Box>
                    </form>
                )}
            </Formik>
            <ShowSnackbar
                open={snackBarOpen}
                onClose={() => setSnackBarOpen(false)}
                message={snackBarMessage}
                severity={severity}
            />
        </Box>
    );
};

export default CreateWatch;

// Validation schema for form fields
const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    brand_id: yup.string().required("Brand is required"),
    type: yup.string().required("Type is required"),
    gender: yup.string().required("Gender is required"),
    price: yup.number().required("Price is required"),
    strap_id: yup.string().required("Strap is required"),
    slug: yup.string().required("Slug is required"),
    origin: yup.string().required("Origin is required"),
    water_resistance_level_id: yup
        .string()
        .required("Water resistance level is required"),
    case_color_id: yup.string().required("Case color is required"),
    dial_color_id: yup.string().required("Dial color is required"),
    dial_size_id: yup.string().required("Dial size is required"),
    dial_shape_id: yup.string().required("Dial shape is required"),
    glass_material_id: yup.string().required("Glass material is required"),
    energy_id: yup.string().required("Energy is required"),
    sku: yup.string().required("SKU is required"),
    stock_quantity: yup.number().required("Stock quantity is required"),
    description: yup.string().required("Description is required"),
    weight: yup.number().required("Weight is required"),
    warranty: yup.number().required("Warranty is required"),
    meta_title: yup.string().required("Meta title is required"),
    meta_description: yup.string().required("Meta description is required"),
    meta_keywords: yup.string().required("Meta keywords are required"),
    release_date: yup.date().required("Release date is required"),
});

// Initial values for form fields
const initialValues = {
    name: "",
    brand_id: "",
    type: "",
    gender: "",
    price: "",
    strap_id: "",
    slug: "",
    origin: "",
    water_resistance_level_id: "",
    case_color_id: "",
    dial_color_id: "",
    dial_size_id: "",
    dial_shape_id: "",
    glass_material_id: "",
    energy_id: "",
    sku: "",
    stock_quantity: "",
    description: "",
    weight: "",
    warranty: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    release_date: "",
};
