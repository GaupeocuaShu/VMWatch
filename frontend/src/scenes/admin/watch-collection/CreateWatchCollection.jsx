import { Box, Button, TextField, Skeleton } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../../components/Header";
import LoadingButton from "@mui/lab/LoadingButton";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { useState, useEffect } from "react";
import axiosClient from "../../../axios-client";
import ShowSnackbar from "../../../components/SnackBar";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { styled } from "@mui/material/styles";
import NoImage from "../../../components/NoImage";
const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const CreateWatchCollection = () => {
    // Notification --------------------------------
    const [loading, setLoading] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("success");
    const [severity, setSeverity] = useState("");
    // Notification --------------------------------

    // Upload -------------------------------
    const [isImageEmpty, setIsImageEmpty] = useState(true);
    const [banner, setBanner] = useState(null);
    const [file, setFile] = useState(null);
    // Upload -------------------------------

    // Data ---------------------------
    const [brands, setBrands] = useState([]);
    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const { data } = await axiosClient.get("/api/brands");
                setBrands(data.data);
            } catch (error) {
                console.error("Error fetching select options", error);
            }
        };
        fetchBrands();
    }, []);
    // Data ---------------------------

    // Handle Reset
    const handleReset = (handleReset) => {
        handleReset();
        setBanner("");
        setIsImageEmpty(true);
        setFile(null);
    };
    // Submit preview image
    const handleSubmitPreviewImage = async (event) => {
        setBanner(null);
        setIsImageEmpty(false);
        const file = event.target.files[0];
        setFile(file);
        const form = new FormData();
        form.append("banner", file);
        const {
            data: { banner },
        } = await axiosClient.post("api/banners/preview-upload", form, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        setBanner(banner);
    };
    // Submit the form
    const handleFormSubmit = async (data, { resetForm }) => {
        setLoading(true);
        data = { ...data, banner: file };
        await axiosClient
            .post("api/watch-collections", data, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then(({ data }) => {
                setSeverity("success");
                setSnackBarOpen(true);
                setSnackBarMessage("Create Watch Collection Successfully");
                handleReset(resetForm);
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
                title="CREATE WATCH COLLECTION"
                subtitle="Create a New Collection "
                action="create"
                router="watch-collection"
            />
            <Formik
                initialValues={initialValues}
                onSubmit={handleFormSubmit}
                validationSchema={validationSchema}
            >
                {(formik) => {
                    return (
                        <form onSubmit={formik.handleSubmit}>
                            <Box
                                display="flex"
                                flexDirection="column"
                                rowGap={4}
                            >
                                <Box border="1px dashed white">
                                    <Button
                                        sx={{ height: "400px", width: "100%" }}
                                        component="label"
                                    >
                                        {isImageEmpty ? (
                                            <NoImage />
                                        ) : banner ? (
                                            <img
                                                height="100%"
                                                width="100%"
                                                src={banner}
                                                alt="banner"
                                            />
                                        ) : (
                                            <Skeleton
                                                variant="rectangular"
                                                width="100%"
                                                height="100%"
                                                animation="wave"
                                            />
                                        )}

                                        <VisuallyHiddenInput
                                            type="file"
                                            onChange={handleSubmitPreviewImage}
                                        />
                                    </Button>
                                </Box>
                                <TextField
                                    type="text"
                                    variant="outlined"
                                    name="name"
                                    label="name"
                                    {...formik.getFieldProps("name")}
                                    error={
                                        formik.touched.name &&
                                        formik.errors.name
                                    }
                                    helperText={
                                        formik.touched.name &&
                                        formik.errors.name
                                    }
                                />
                                <FormControl>
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
                                <TextField
                                    type="text"
                                    variant="outlined"
                                    name="title"
                                    label="title"
                                    {...formik.getFieldProps("title")}
                                    error={
                                        formik.touched.title &&
                                        formik.errors.title
                                    }
                                    helperText={
                                        formik.touched.title &&
                                        formik.errors.title
                                    }
                                />

                                <TextField
                                    type="text"
                                    variant="outlined"
                                    name="description"
                                    label="description"
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

                                <Box
                                    display="flex"
                                    justifyContent="end"
                                    gap={3}
                                >
                                    <Button
                                        onClick={() =>
                                            handleReset(formik.handleReset)
                                        }
                                        variant="outlined"
                                        size="large"
                                        endIcon={<RestartAltOutlinedIcon />}
                                    >
                                        Reset
                                    </Button>
                                    <LoadingButton
                                        size="large"
                                        loading={loading}
                                        endIcon={
                                            <CheckCircleOutlineOutlinedIcon />
                                        }
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
                    );
                }}
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
export default CreateWatchCollection;

const validationSchema = yup.object().shape({
    name: yup.string().required("Required"),
    title: yup.string().required("Required"),
    description: yup.string().required("Required"),
    brand_id: yup.string().required("Brand is required"),
});

const initialValues = {
    name: "",
    title: "",
    description: "",
    brand_id: "",
};
