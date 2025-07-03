import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate


const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

export default useQuery;
