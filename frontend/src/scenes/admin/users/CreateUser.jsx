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

export const CreateUser = () => {
    const [loading, setLoading] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const handleFormSubmit = async (data) => {
        setLoading(true);
        await axiosClient
            .post("api/users", data)
            .then(({ data }) => {
                setSnackBarOpen(true);
                console.log(data.data);
            })
            .catch(({ response }) => {
                setSnackBarOpen(true);
                console.log(response.data.message);
            })
            .finally(() => setLoading(false));
    };
    return (
        <Box m="20px">
            <Header title="CREATE USER" subtitle="Create a New User Profile" />
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
                                <TextField
                                    type="email"
                                    variant="outlined"
                                    name="email"
                                    label="Email"
                                    {...formik.getFieldProps("email")}
                                    error={
                                        formik.touched.email &&
                                        formik.errors.email
                                    }
                                    helperText={
                                        formik.touched.email &&
                                        formik.errors.email
                                    }
                                />
                                <TextField
                                    type="text"
                                    variant="outlined"
                                    name="name"
                                    label="Name"
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
                                    name="phone"
                                    label="Phone"
                                    {...formik.getFieldProps("phone")}
                                    error={
                                        formik.touched.phone &&
                                        formik.errors.phone
                                    }
                                    helperText={
                                        formik.touched.phone &&
                                        formik.errors.phone
                                    }
                                />
                                <TextField
                                    type="text"
                                    variant="outlined"
                                    name="role"
                                    label="Role"
                                    {...formik.getFieldProps("role")}
                                    error={
                                        formik.touched.role &&
                                        formik.errors.role
                                    }
                                    helperText={
                                        formik.touched.role &&
                                        formik.errors.role
                                    }
                                />

                                <TextField
                                    type="password"
                                    variant="outlined"
                                    name="password"
                                    label="Password"
                                    {...formik.getFieldProps("password")}
                                    error={
                                        formik.touched.password &&
                                        formik.errors.password
                                    }
                                    helperText={
                                        formik.touched.password &&
                                        formik.errors.password
                                    }
                                />
                                <TextField
                                    type="password"
                                    variant="outlined"
                                    name="passwordConfirm"
                                    label="Password Confirm"
                                    {...formik.getFieldProps("passwordConfirm")}
                                    error={
                                        formik.touched.passwordConfirm &&
                                        formik.errors.passwordConfirm
                                    }
                                    helperText={
                                        formik.touched.passwordConfirm &&
                                        formik.errors.passwordConfirm
                                    }
                                />
                                <LoadingButton
                                    size="large"
                                    loading={loading}
                                    endIcon={<CheckCircleOutlineOutlinedIcon />}
                                    color="blue"
                                    type="submit"
                                    variant="outlined"
                                    loadingPosition="center"
                                >
                                    Create
                                </LoadingButton>
                            </Box>
                        </form>
                    );
                }}
            </Formik>
            <ShowSnackbar
                open={snackBarOpen}
                onClose={() => setSnackBarOpen(false)}
            />
        </Box>
    );
};

const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const validationSchema = yup.object().shape({
    name: yup.string().required("required"),
    role: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    passwordConfirm: yup
        .string()
        .required()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("Password must match"),
    phone: yup
        .string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("required"),
});
const initialValues = {
    name: "",
    email: "",
    phone: "",
    role: "",
    password: "",
    passwordConfirm: "",
};
