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
const EditWatchCollection = () => {
    const { id } = useParams();
    const [watchCollectionFound, setWatchCollectionFound] = useState(true);
    const [previewBanner, setPreviewBanner] = useState(false);

    // Upload -------------------------------
    const [watchCollection, setWatchCollection] = useState(null);
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
        const fetchWatchCollectionByID = async (id) => {
            await axiosClient
                .get(`/api/watch-collections/${id}`)
                .then(({ data }) => {
                    const rawBrand = data.data;
                    console.log(rawBrand);
                    const brandObject = {
                        id: rawBrand.id,
                        name: rawBrand.name,
                        description: rawBrand.description,
                        title: rawBrand.title,
                        banner: rawBrand.banner,
                        brand_id: rawBrand.brand_id,
                    };

                    setWatchCollection(brandObject);
                    setPreviewBanner(brandObject.banner);
                })
                .catch(({ response }) => setWatchCollectionFound(false));
        };
        fetchWatchCollectionByID(id);
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
        formData.append("brand_id", data.brand_id);
        formData.append("title", data.title);
        formData.append("description", data.description);
        // Append file if it exists
        if (file) {
            formData.append("banner", file);
        }
        console.log(formData);
        await axiosClient
            .post(`api/watch-collections/${watchCollection.id}`, formData)
            .then(({ data }) => {
                setSnackBarOpen(true);
                setSnackBarMessage("Update Watch Collection Successfully");
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
            {watchCollection ? (
                <Box m="20px">
                    <Header
                        title="EDIT WATCH COLLECTION"
                        subtitle="Edit Watch Collection "
                        router="watch-collection"
                        action="edit"
                    />
                    <Formik
                        initialValues={watchCollection}
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
                                                {...formik.getFieldProps(
                                                    "brand_id"
                                                )}
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
            ) : watchCollectionFound ? (
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
                        Watch Collection not found
                    </Alert>
                </Box>
            )}
        </>
    );
};
export default EditWatchCollection;

const validationSchema = yup.object().shape({
    name: yup.string().required("Required"),
    title: yup.string().required("Required"),
    description: yup.string().required("Required"),
    brand_id: yup.string().required("Brand is required"),
});
