import { Box, Button, TextField, Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../../components/Header";
import LoadingButton from "@mui/lab/LoadingButton";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import ShowSnackbar from "../../../components/SnackBar";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import NoImage from "../../../components/NoImage";
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
const EditBanner = () => {
    const { id } = useParams();
    const [bannerFound, setBannerFound] = useState(true);
    const [previewBanner, setPreviewBanner] = useState(false);
    // Upload -------------------------------
    const [banner, setBanner] = useState(null);
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
        const fetchBannerByID = async (id) => {
            await axiosClient
                .get(`/api/banners/${id}`)
                .then(({ data }) => {
                    const rawBanner = data.data;
                    console.log(rawBanner);
                    const bannerObject = {
                        id: rawBanner.id,
                        name: rawBanner.name,
                        status: rawBanner.status,
                        serial: rawBanner.serial,
                        banner: rawBanner.banner,
                        link: rawBanner.link,
                    };
                    setBanner(bannerObject);
                    setPreviewBanner(bannerObject.banner);
                })
                .catch(({ response }) => setBannerFound(false));
        };
        fetchBannerByID(id);
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
        formData.append("link", data.link);
        formData.append("serial", data.serial);
        formData.append("status", data.status);

        // Append file if it exists
        if (file) {
            formData.append("banner", file);
        }
        console.log(formData);
        await axiosClient
            .post(`api/banners/${banner.id}`, formData)
            .then(({ data }) => {
                setSnackBarOpen(true);
                setSnackBarMessage("Update Banner Successfully");
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
            {banner ? (
                <Box m="20px">
                    <Header
                        title="CREATE BANNER"
                        subtitle="Create A New Banner Profile"
                        action="create"
                        router="banner"
                    />
                    <Formik
                        initialValues={banner}
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
                                                {...formik.getFieldProps(
                                                    "status"
                                                )}
                                            >
                                                <MenuItem value="1">
                                                    Active
                                                </MenuItem>
                                                <MenuItem value="0">
                                                    Inactive
                                                </MenuItem>
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
            ) : bannerFound ? (
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
                        Banner not found
                    </Alert>
                </Box>
            )}
        </>
    );
};
export default EditBanner;

const validationSchema = yup.object().shape({
    name: yup.string().required("Required"),
    link: yup.string(),
    serial: yup.number().typeError("Must be a number"),
    status: yup.string().required("Required"),
});
