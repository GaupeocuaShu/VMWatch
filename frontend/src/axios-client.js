import axios from "axios";
const axiosClient = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true,
    withXSRFToken: true,
})

export default axiosClient;