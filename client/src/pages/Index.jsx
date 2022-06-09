import React, { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom"
import { refreshToken } from "../utils/auth";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Button from "../components/Button";

axios.defaults.withCredentials = true;


const Index = (props) => {

    const { value, setValue } = useContext(UserContext);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    console.log("The context now: ", value)

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

    useEffect(() => {
        let loading = true;
        if (loading) {
            const persistLogin = async () => {
                try {
                    const response = await refreshToken(setValue, setError);
                    if (!response.success) {
                        navigate("/login");
                    };
                } catch (err) {
                    console.log(err);
                }
            };
            persistLogin();
        };
        return () => {
            loading = false;
        }

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

    return (
        <div>
            <Button content="Log Out" submit={logout} />
        </div>
    )
};

export default Index;