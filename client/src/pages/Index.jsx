import React, { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom"
import { refreshToken } from "../utils/auth";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Button from "../components/Button";
import { IndexConteiner } from "../styles/Containers";
import Image from "../components/Image";
import Info from "../components/Info";

axios.defaults.withCredentials = true;


const Index = () => {

    const { value, setValue } = useContext(UserContext);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(
        async (config) => {
            const currentDate = new Date();
            const decodedToken = jwt_decode(value.accessToken);
            if (decodedToken.exp * 1000 < currentDate.getTime()) {
                const data = await refreshToken(setValue, setError);
                config.headers.authorization = `Bearer ${data.accessToken}`
            } else {
                config.headers.authorization = `Bearer ${value.accessToken}`
            }
            return config;
        }, (error) => {
            return Promise.reject(error);
        }
    );

    const persistLogin = async () => {
        try {
            setLoading(true);
            const response = await refreshToken(setValue, setError);
            if (!response.success) {
                navigate("/login");
            };
            setLoading(false)
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        persistLogin();
    }, []);

    const logout = async () => {
        try {
            if (value) {
                const response = await axiosJWT.post("http://localhost:8080/user/logout");
                setValue(null);
                navigate("/login");
            }
        } catch (e) {
            console.log(e);
            setError(e.response.data.error);
        };
    };

    if (loading) {
        return (
            <div>Loading...</div>
        )
    } else if (value) {
        return (
            <IndexConteiner>
                <Image imageUrl={value.user.picture} />
                <Info logout={logout} name={value.user.name} />
            </IndexConteiner>
        )
    } else {
        return <IndexConteiner />
    }
};

export default Index;