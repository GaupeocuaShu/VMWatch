import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import LoadingButton from "@mui/lab/LoadingButton";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import ShowSnackbar from "../../../components/SnackBar";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";
export const EditUser = () => {
    const { id } = useParams();
    const [userFound, setUserFound] = useState(true);
    const [user, setUser] = useState(null);
    useEffect(() => console.log(user), [user]);
    //fetch user by id
    useEffect(() => {
        const fetchUserByID = async (id) => {
            await axiosClient
                .get(`/api/users/${id}`)
                .then(({ data }) => {
                    const rawUser = data.data;
                    const userObject = {
                        id: rawUser.id,
                        name: rawUser.name,
                        email: rawUser.email,
                        phone: rawUser.phone,
                        role: rawUser.role,
                    };
                    setUser(userObject);
                })
                .catch(({ response }) => setUserFound(false));
        };
        fetchUserByID(id);
    }, []);
    const [loading, setLoading] = useState(false);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState("success");
    const [severity, setSeverity] = useState("");
    const handleFormSubmit = async (data) => {
        setLoading(true);
        await axiosClient
            .put(`api/users/${user.id}`, data)
            .then(({ data }) => {
                setSnackBarOpen(true);
                setSnackBarMessage("Update User Successfully");
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
            <Box m="20px"></Box>
            {user ? (
                <Box m="20px">
                    <Header
                        title="EDIT USER"
                        subtitle="Edit User Profile"
                        action="edit"
                    />
                    <Formik
                        initialValues={user}
                        onSubmit={handleFormSubmit}
                        validationSchema={validationSchema}
                        enableReinitialize
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
                                        <FormControl>
                                            <InputLabel
                                                error={
                                                    formik.touched.role &&
                                                    formik.errors.role
                                                }
                                                id="demo-simple-select-helper-label"
                                            >
                                                Role
                                            </InputLabel>
                                            <Select
                                                labelId="demo-simple-select-helper-label"
                                                id="demo-simple-select-helper"
                                                name="role"
                                                label="Role"
                                                error={
                                                    formik.touched.role &&
                                                    formik.errors.role
                                                }
                                                {...formik.getFieldProps(
                                                    "role"
                                                )}
                                            >
                                                <MenuItem value="admin">
                                                    Admin
                                                </MenuItem>
                                                <MenuItem value="user">
                                                    User
                                                </MenuItem>
                                            </Select>
                                            {formik.touched.role && (
                                                <FormHelperText error>
                                                    {formik.errors.role}
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
            ) : userFound ? (
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
                        User not found
                    </Alert>
                </Box>
            )}
        </>
    );
};

const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const validationSchema = yup.object().shape({
    name: yup.string().required("required"),
    role: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    phone: yup
        .string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("required"),
});
