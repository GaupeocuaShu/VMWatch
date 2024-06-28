import { Box, Button, TextField, Skeleton } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../../../components/Header";
import LoadingButton from "@mui/lab/LoadingButton";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { useState } from "react";
import axiosClient from "../../../../axios-client";
import ShowSnackbar from "../../../../components/SnackBar";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import { styled } from "@mui/material/styles";
import NoImage from "../../../../components/NoImage";
import { useParams } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
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

const CreateBrandGallery = () => {
    const { id } = useParams();
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
        data = { ...data, banner: file, brand_id: id };
        await axiosClient
            .post("api/brands/save-upload", data, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then(({ data }) => {
                setSeverity("success");
                setSnackBarOpen(true);
                setSnackBarMessage("Create Brand Gallery Successfully");
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
                title="CREATE GALLERY"
                subtitle="Create a New Gallery"
                action="create"
                router={`brand/${id}/brand-gallery`}
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
                                <Box
                                    border="1px dashed white"
                                    width="100%"
                                    height="600px"
                                >
                                    <Button
                                        sx={{ height: "100%", width: "100%" }}
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
export default CreateBrandGallery;

const validationSchema = yup.object().shape({
    serial: yup.number().integer("Must be number").required("Required"),
    type: yup.string().required("required"),
});

const initialValues = {
    serial: "",
    type: "gallery",
};
