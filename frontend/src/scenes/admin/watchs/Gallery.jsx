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
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

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
const WatchGallery = () => {
    const { id } = useParams();
    const [isUpdate, setIsUpdate] = useState(true);
    const [galleries, setGalleries] = useState([]);
    const [brandFound, setBrandFound] = useState(true);
    const [previewBanner, setPreviewBanner] = useState(false);
    console.log(galleries);
    // Upload -------------------------------
    const [brand, setBrand] = useState("aa");
    // Upload -------------------------------

    const [loading, setLoading] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("success");
    const [severity, setSeverity] = useState("");

    // Submit preview image
    const handleSubmitPreviewImage = async (event) => {
        setIsUpdate(false);
        setPreviewBanner(null);
        const file = event.target.files[0];
        const form = new FormData();
        form.append("banner", file);
        const {
            data: { banner, path, isSaved, status },
        } = await axiosClient.post("api/watches/preview-upload", form, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        if (status === "success") {
            setSnackBarOpen(true);
            setSnackBarMessage("Upload Image Successfully");
            setSeverity("success");
            setGalleries((galleries) => [
                ...galleries,
                { banner, path, isSaved },
            ]);
        }
    };
    // Submit gallery
    const handleSubmitGalleries = async () => {
        const {
            data: { status },
        } = await axiosClient.post("api/watches/saved-upload");
        if (status === "success") {
            setSnackBarOpen(true);
            setSeverity("success");
            setSnackBarMessage("Update Gallery Successfully");
            const savedGalleries = [...galleries];
            savedGalleries.map((gallery) => gallery.isSaved === true);
            setGalleries(savedGalleries);
        }
    };
    //fetch Banner by id  // useEffect(() => {
    //     const fetchBrandByID = async (id) => {
    //         await axiosClient
    //             .get(`/api/brands/${id}`)
    //             .then(({ data }) => {
    //                 const rawBrand = data.data;
    //                 console.log(rawBrand);
    //                 const brandObject = {
    //                     id: rawBrand.id,
    //                     name: rawBrand.name,
    //                     description: rawBrand.description,
    //                     banner: rawBrand.banner,
    //                 };

    //                 setBrand(brandObject);
    //                 setPreviewBanner(brandObject.banner);
    //             })
    //             .catch(({ response }) => setBrandFound(false));
    //     };
    //     fetchBrandByID(id);
    // }, []);

    return (
        <>
            {brand ? (
                <Box m="20px">
                    <Header
                        title="UPDATE GALLERY"
                        subtitle="Update or add more gallery"
                        action="create"
                        router="watch"
                    />

                    <Box display="flex" flexDirection="column" rowGap={4}>
                        <Box border="1px dashed white" height="402px">
                            <Swiper
                                slidesPerView={3}
                                spaceBetween={10}
                                pagination={{
                                    clickable: true,
                                }}
                                className="mySwiper"
                            >
                                {galleries.map((gallery, index) => (
                                    <SwiperSlide className="watch-swiper-slide">
                                        <img
                                            src={gallery.banner}
                                            alt="banner"
                                            height="400px"
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </Box>

                        <Box display="flex" justifyContent="end" gap={3}>
                            <Button
                                component="label"
                                size="large"
                                color="primary"
                                variant="outlined"
                                endIcon={<DriveFolderUploadOutlinedIcon />}
                            >
                                Upload
                                <VisuallyHiddenInput
                                    type="file"
                                    onChange={handleSubmitPreviewImage}
                                />
                            </Button>
                            <LoadingButton
                                size="large"
                                loading={loading}
                                endIcon={<CheckCircleOutlineOutlinedIcon />}
                                color="blue"
                                type="submit"
                                variant="outlined"
                                loadingPosition="center"
                                disabled={isUpdate}
                                onClick={handleSubmitGalleries}
                            >
                                Update
                            </LoadingButton>
                        </Box>
                    </Box>

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
export default WatchGallery;
