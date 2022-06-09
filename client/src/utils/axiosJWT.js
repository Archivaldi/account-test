import axios from "axios";
import jwt_decode from "jwt-decode";
import { refreshToken } from "./auth";


const CustomAxios = (user, setUser) => {
    axios.defaults.withCredentials = true;
    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(
        async (config) => {
            const currentDate = new Date();
            const decodedToken = jwt_decode(user.accessToken);
            if (decodedToken.exp * 1000 < currentDate.getTime()) {
                const data = await refreshToken(user, setUser);
                config.headers.authorization = `Bearer ${data.accessToken}`
            };
            return config;
        }, (error) => {
            return Promise.reject(error);
        }
    );

    return axiosJWT;
};

export default CustomAxios;

