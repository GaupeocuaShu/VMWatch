import { Box, Button, TextField, Skeleton } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../../components/Header";
import LoadingButton from "@mui/lab/LoadingButton";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { useState } from "react";
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

const CreateBrand = () => {
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
            .post("api/brands", data, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then(({ data }) => {
                setSeverity("success");
                setSnackBarOpen(true);
                setSnackBarMessage("Create Banner Successfully");
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
                title="CREATE BANNER"
                subtitle="Create a New Brand "
                action="create"
                router="brand"
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
                                            formik.touched.type &&
                                            formik.errors.type
                                        }
                                        id="demo-simple-select-helper-label"
                                    >
                                        type
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        label="type"
                                        defaultValue="user"
                                        error={
                                            formik.touched.type &&
                                            formik.errors.type
                                        }
                                        {...formik.getFieldProps("type")}
                                    >
                                        <MenuItem value="high-end-swiss">
                                            High-end from Swiss
                                        </MenuItem>
                                        <MenuItem value="famous">
                                            Famous
                                        </MenuItem>
                                    </Select>
                                    {formik.touched.type && (
                                        <FormHelperText error>
                                            {formik.errors.type}
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
                                <TextField
                                    type="text"
                                    variant="outlined"
                                    name="meta_title"
                                    label="meta_title"
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
                                <TextField
                                    type="text"
                                    variant="outlined"
                                    name="meta_description"
                                    label="meta_description"
                                    {...formik.getFieldProps(
                                        "meta_description"
                                    )}
                                    error={
                                        formik.touched.meta_description &&
                                        formik.errors.meta_description
                                    }
                                    helperText={
                                        formik.touched.meta_description &&
                                        formik.errors.meta_description
                                    }
                                />
                                <TextField
                                    type="text"
                                    variant="outlined"
                                    name="meta_keywords"
                                    label="meta_keywords"
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
export default CreateBrand;

const validationSchema = yup.object().shape({
    name: yup.string().required("Required"),
    type: yup.string().required("Required"),
    description: yup.string().required("Required"),
    title: yup.string().required("Meta title is required"),
    meta_title: yup.string().required("Meta title is required"),
    meta_description: yup.string().required("Meta description is required"),
    meta_keywords: yup.string().required("Meta keywords are required"),
});

const initialValues = {
    name: "",
    type: "",
    description: "",
    title: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
};
