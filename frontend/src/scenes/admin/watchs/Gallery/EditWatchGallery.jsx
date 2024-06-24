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
const EditWatchGallery = () => {
    const { watchID, id } = useParams();
    console.log(watchID + " " + id);
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
        const fetchWatchGalleryByID = async (id) => {
            await axiosClient
                .get(`/api/watches/${watchID}/watch-gallery/${id}/edit`)
                .then(({ data }) => {
                    const rawWatchGallery = data.data;
                    console.log(rawWatchGallery);
                    const watchGalleryObject = {
                        id: rawWatchGallery.id,
                        serial: rawWatchGallery.serial,
                        type: rawWatchGallery.type,
                        banner: rawWatchGallery.banner,
                    };

                    setBrand(watchGalleryObject);
                    setPreviewBanner(watchGalleryObject.banner);
                })
                .catch(({ response }) => setBrandFound(false));
        };
        fetchWatchGalleryByID(id);
    }, []);
    const [loading, setLoading] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("success");
    const [severity, setSeverity] = useState("");
    const handleFormSubmit = async (data) => {
        setLoading(true);
        const formData = new FormData();
        formData.append("_method", "PUT");
        formData.append("serial", data.serial);
        formData.append("type", data.type);

        // Append file if it exists
        if (file) {
            formData.append("banner", file);
        }
        console.log(formData);
        await axiosClient
            .post(
                `api/watches/${watchID}/watch-gallery/${brand.id}/update`,
                formData
            )
            .then(({ data }) => {
                setSnackBarOpen(true);
                setSnackBarMessage("Update Watch Gallery Successfully");
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
                        title="EDIT GALLERY"
                        subtitle="Create A New Gallery "
                        action="edit"
                        router={`watch/${id}/watch-gallery`}
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
                                                {...formik.getFieldProps(
                                                    "type"
                                                )}
                                            >
                                                <MenuItem value="front">
                                                    Main
                                                </MenuItem>
                                                <MenuItem value="thumb">
                                                    Thumb
                                                </MenuItem>
                                                <MenuItem value="gallery">
                                                    Gallery
                                                </MenuItem>
                                            </Select>
                                            {formik.touched.type && (
                                                <FormHelperText error>
                                                    {formik.errors.type}
                                                </FormHelperText>
                                            )}
                                        </FormControl>

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
    serial: yup.number().integer("Must be number").required("Required"),
    type: yup.string().required("required"),
});
