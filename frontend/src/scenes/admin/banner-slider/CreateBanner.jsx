import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
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

const CreateBanner = () => {
    const [loading, setLoading] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("success");
    const [severity, setSeverity] = useState("");
    // Submit preview image
    const handleSubmitPreviewImage = async (event) => {
        const file = event.target.files[0];
        const form = new FormData();
        form.append("banner", file);
        const {
            data: { banner },
        } = await axiosClient.post("api/banners/preview-upload", form, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(banner);
    };
    // Submit the form
    const handleFormSubmit = async (data, { resetForm }) => {
        setLoading(true);
        await axiosClient
            .post("api/users", data)
            .then(({ data }) => {
                setSnackBarOpen(true);
                setSnackBarMessage("Create User Successfully");
                setSeverity("success");
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
                title="CREATE BANNER"
                subtitle="Create a New User Profile"
                action="create"
                router="banner-slider"
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
                                        <NoImage />
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

                                <TextField
                                    type="text"
                                    variant="outlined"
                                    name="link"
                                    label="link"
                                    {...formik.getFieldProps("link")}
                                    error={
                                        formik.touched.link &&
                                        formik.errors.link
                                    }
                                    helperText={
                                        formik.touched.link &&
                                        formik.errors.link
                                    }
                                />
                                <TextField
                                    type="text"
                                    variant="outlined"
                                    name="serial"
                                    label="serial"
                                    {...formik.getFieldProps("serial")}
                                    error={
                                        formik.touched.serial &&
                                        formik.errors.serial
                                    }
                                    helperText={
                                        formik.touched.serial &&
                                        formik.errors.serial
                                    }
                                />
                                <FormControl>
                                    <InputLabel
                                        error={
                                            formik.touched.status &&
                                            formik.errors.status
                                        }
                                        id="demo-simple-select-helper-label"
                                    >
                                        status
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        label="status"
                                        error={
                                            formik.touched.status &&
                                            formik.errors.status
                                        }
                                        {...formik.getFieldProps("status")}
                                    >
                                        <MenuItem value="1">Active</MenuItem>
                                        <MenuItem value="0">Inactive</MenuItem>
                                    </Select>
                                    {formik.touched.status && (
                                        <FormHelperText error>
                                            {formik.errors.status}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                                <Box
                                    display="flex"
                                    justifyContent="end"
                                    gap={3}
                                >
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
export default CreateBanner;

const validationSchema = yup.object().shape({
    name: yup.string().required("Required"),
    link: yup.string(),
    serial: yup.number().typeError("Must be a number"),
    status: yup.string().required("Required"),
});

const initialValues = {
    name: "",
    link: "",
    serial: "",
    status: "1", // Set default status as "true" for Active
};
