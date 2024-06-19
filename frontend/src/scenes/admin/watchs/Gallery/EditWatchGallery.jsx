import { Box, Button, TextField, Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../../../components/Header";
import LoadingButton from "@mui/lab/LoadingButton";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { useEffect, useState } from "react";
import axiosClient from "../../../../axios-client";
import ShowSnackbar from "../../../../components/SnackBar";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
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
const EditWatchGallery = () => {
    const { id } = useParams();
    const [brandFound, setBrandFound] = useState(true);
    const [previewBanner, setPreviewBanner] = useState(false);

    // Upload -------------------------------
    const [brand, setBrand] = useState(null);
    const [file, setFile] = useState(null);

    // Upload -------------------------------

    // Submit preview image
    const handleSubmitPreviewImage = async (event) => {
        setPreviewBanner(null);
        const file = event.target.files[0];
        setFile(file);
        const form = new FormData();
        form.append("banner", file);
        const {
            data: { banner },
        } = await axiosClient.post("api/banners/preview-upload", form, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        setPreviewBanner(banner);
    };

    //fetch Banner by id
    useEffect(() => {
        const fetchBrandByID = async (id) => {
            await axiosClient
                .get(`/api/brands/${id}`)
                .then(({ data }) => {
                    const rawBrand = data.data;
                    console.log(rawBrand);
                    const brandObject = {
                        id: rawBrand.id,
                        name: rawBrand.name,
                        description: rawBrand.description,
                        banner: rawBrand.banner,
                    };

                    setBrand(brandObject);
                    setPreviewBanner(brandObject.banner);
                })
                .catch(({ response }) => setBrandFound(false));
        };
        fetchBrandByID(id);
    }, []);
    const [loading, setLoading] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("success");
    const [severity, setSeverity] = useState("");
    const handleFormSubmit = async (data) => {
        setLoading(true);
        const formData = new FormData();
        formData.append("_method", "PUT");
        formData.append("name", data.name);
        formData.append("description", data.description);

        // Append file if it exists
        if (file) {
            formData.append("banner", file);
        }
        console.log(formData);
        await axiosClient
            .post(`api/brands/${brand.id}`, formData)
            .then(({ data }) => {
                setSnackBarOpen(true);
                setSnackBarMessage("Update Brand Successfully");
                setSeverity("success");
            })
            .catch(({ response }) => {
                setSeverity("error");
                setSnackBarOpen(true);
                setSnackBarMessage(response.data.message);
            })
            .finally(() => setLoading(false));
    };

    return (
        <>
            {brand ? (
                <Box m="20px">
                    <Header
                        title="CREATE GALLERY"
                        subtitle="Create A New Gallery "
                        action="create"
                        router=""
                    />
                    <Formik
                        initialValues={brand}
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
                                                sx={{
                                                    height: "400px",
                                                    width: "100%",
                                                }}
                                                component="label"
                                            >
                                                {!previewBanner ? (
                                                    <Skeleton
                                                        variant="rectangular"
                                                        width="100%"
                                                        height="100%"
                                                        animation="wave"
                                                    />
                                                ) : (
                                                    <img
                                                        height="100%"
                                                        width="100%"
                                                        src={previewBanner}
                                                        alt="banner"
                                                    />
                                                )}
                                                <VisuallyHiddenInput
                                                    type="file"
                                                    onChange={
                                                        handleSubmitPreviewImage
                                                    }
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
                                            name="description"
                                            label="description"
                                            {...formik.getFieldProps(
                                                "description"
                                            )}
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
                                                Update
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
            ) : brandFound ? (
                <Box
                    height="100vh"
                    m="20px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <CircularProgress />
                </Box>
            ) : (
                <Box m="20px">
                    <Alert variant="filled" severity="error">
                        Brand not found
                    </Alert>
                </Box>
            )}
        </>
    );
};
export default EditWatchGallery;

const validationSchema = yup.object().shape({
    name: yup.string().required("Required"),
    description: yup.string().required("Required"),
});
