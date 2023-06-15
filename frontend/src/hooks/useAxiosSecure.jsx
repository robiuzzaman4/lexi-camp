import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const axiosSecure = axios.create({
    baseURL: "https://lexi-camp-server.vercel.app"
})

const useAxiosSecure = () => {
    const { userLogout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.interceptors.request.use((request) => {
            const token = localStorage.getItem("access-token");
            if (token) {
                request.headers.Authorization = `Bearer ${token}`;
            }
            return request;
        })

        axiosSecure.interceptors.response.use((response) => response, async (err) => {
            if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                await userLogout()
                navigate("/login");
            }
            return Promise.reject(err);
        })
    }, [navigate, userLogout])

    return { axiosSecure };
};

export default useAxiosSecure;