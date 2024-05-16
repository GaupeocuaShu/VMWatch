import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";

import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import { Formik } from "formik";
import * as yup from "yup";
import Logo from "../../../components/Logo";
import axiosClient from "../../../axios-client";
import { useState } from "react";
import { Link } from "react-router-dom";
const initialValues = {
    email: "",
    password: "",
};
const validationSchema = yup.object({
    email: yup
        .string()
        .email("Email is not valid")
        .required("Email is required"),
    password: yup.string().required("Password is required"),
});
const Login = () => {
    const [loading, setLoading] = useState(false);
    const [errorFromServer, setErrorFromServer] = useState("");
    const handleFormSubmit = async (data) => {
        setLoading(true);
        setErrorFromServer("");
        await axiosClient.get("/sanctum/csrf-cookie");
        try {
            await axiosClient
                .post("/register", data)
                .then((res) => {})
                .catch(({ response }) => {
                    setErrorFromServer(response.data.message);
                })
                .finally(() => setLoading(false));
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            rowGap={4}
        >
            <Box border="1px solid black" borderRadius="10px" p={4}>
                <Box textAlign="center" bg>
                    <Logo />
                </Box>
                {errorFromServer && (
                    <Box my={3}>
                        <Alert severity="error" variant="filled">
                            {errorFromServer}
                        </Alert>
                    </Box>
                )}
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
                                    width="400px"
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
                                    <LoadingButton
                                        loading={loading}
                                        endIcon={<SendIcon />}
                                        color="primary"
                                        type="submit"
                                        variant="contained"
                                        loadingPosition="center"
                                    >
                                        Login
                                    </LoadingButton>
                                    <Button
                                        endIcon={<LoginOutlinedIcon />}
                                        color="primary"
                                        variant="outlined"
                                        LinkComponent={Link}
                                        to="/sign-up"
                                    >
                                        Sign Up
                                    </Button>
                                </Box>
                            </form>
                        );
                    }}
                </Formik>
            </Box>
        </Box>
    );
};

export default Login;
