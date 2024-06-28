import React from "react";
import { Box } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Formik } from "formik";
import { useState, useEffect } from "react";
import axiosClient from "../axios-client";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
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
                        <Box
                            display="grid"
                            gap={2}
                            gridTemplateColumns="repeat(4,1fr)"
                        >
                            <MultipleSelectChip title="brand" datas={brands} />
                            {/* Brand */}
                            <FormControl sx={{ flex: "1", color: "secondary" }}>
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
                                    <MenuItem value="female">Female</MenuItem>
                                    <MenuItem value="unisex">Unisex</MenuItem>
                                </Select>
                                {formik.touched.gender && (
                                    <FormHelperText error>
                                        {formik.errors.gender}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            {/* Watch Collection */}
                            <FormControl>
                                <InputLabel
                                    error={
                                        formik.touched.watch_collection_id &&
                                        formik.errors.watch_collection_id
                                    }
                                    id="watch_collection_id-label"
                                >
                                    Watch Collection
                                </InputLabel>
                                <Select
                                    labelId="watch_collection_id-label"
                                    id="watch_collection_id"
                                    label="watch collection"
                                    defaultValue=""
                                    error={
                                        formik.touched.watch_collection_id &&
                                        formik.errors.watch_collection_id
                                    }
                                    {...formik.getFieldProps(
                                        "watch_collection_id"
                                    )}
                                >
                                    {watchCollections.map(
                                        (watch_collection) => (
                                            <MenuItem
                                                key={watch_collection.id}
                                                value={watch_collection.id}
                                            >
                                                {watch_collection.name}
                                            </MenuItem>
                                        )
                                    )}
                                </Select>
                                {formik.touched.watch_collection_id && (
                                    <FormHelperText error>
                                        {formik.errors.watch_collection_id}
                                    </FormHelperText>
                                )}
                            </FormControl>

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

                            {/* Water Resistance Level */}
                            <FormControl sx={{ flex: 1 }}>
                                <InputLabel
                                    error={
                                        formik.touched
                                            .water_resistance_level_id &&
                                        formik.errors.water_resistance_level_id
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
                                        formik.errors.water_resistance_level_id
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
                                {formik.touched.water_resistance_level_id && (
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
                                    {...formik.getFieldProps("case_color_id")}
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
                                    {...formik.getFieldProps("dial_color_id")}
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
                                    {...formik.getFieldProps("dial_size_id")}
                                >
                                    {dialSizes.map((size) => (
                                        <MenuItem key={size.id} value={size.id}>
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
                                    {...formik.getFieldProps("dial_shape_id")}
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

                            <MultipleSelectChip />
                        </Box>
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
];

function MultipleSelectChip({ title = "data", datas = names }) {
    const [personName, setPersonName] = React.useState([]);
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };
    return (
        <FormControl sx={{ width: 300 }}>
            <InputLabel id="demo-multiple-chip-label">{title}</InputLabel>
            <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                    <Box
                        sx={{
                            overflow: "scroll",
                            display: "flex",

                            gap: 0.5,
                        }}
                    >
                        {selected.map((value) => (
                            <Chip key={value} label={value} />
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}
            >
                {datas.map((data) => (
                    <MenuItem key={data.id} value={data.name}>
                        {data.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
