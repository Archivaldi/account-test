import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { refreshToken } from "../utils/auth";
import { MainContainer, InputContainer, ButtonContainer, IconContainer } from "../styles/Containers";
import Input from "../components/Input";
import Button from "../components/Button";
import Icon from "../components/Icon";
import { Hr, LoginWith, WelcomeText, ForgotPassword } from "../styles/Helpers";
import SwitchMode from "../components/SwitchMode";

axios.defaults.withCredentials = true;

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(undefined);
    const [user, setUser] = useState(null);
    const axiosJWT = axios.create();
    const [mode, setMode] = useState("login");

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

    useEffect(() => {
        let loading = true;
        if (loading) {
            const persistLogin = async () => {
                try {
                    await refreshToken(user, setUser, setError);
                } catch (err) {
                    console.log(err);
                }
            };
            persistLogin();
        };
        return () => {
            loading = false;
        }

    }, [])

    const submit = async (info) => {
        if (email && password) {
            const response = await axios.post("http://localhost:8080/user/login", { email, password });
            setUser(response.data);
        } else {
            console.log("Email and Password are required to log in")
            setError("Email and Password are required to log in");
        }
    };

    const logout = async () => {
        try {
            if (user) {
                const response = await axiosJWT.post("http://localhost:8080/user/logout", { refreshToken: user.refreshToken }, {
                    headers: {
                        "Content-Type": "application/json",
                        'authorization': `Bearer ${user.accessToken}`
                    },
                });
                if (response.data.error) {
                    console.log(response.data.error);
                } else {
                    setUser(null);
                };
            }
        } catch (e) {
            console.log(e);
        };
    };

    const loginWithGoogle = useGoogleLogin({
        onSuccess: async data => {
            const response = await axios.post("http://localhost:3000/user/google-login", {
                token: data.access_token
            });
            setUser(response.data);

        },
        onError: err => console.log(err)
    })

    return (
        <MainContainer>
            <WelcomeText>Welcome</WelcomeText>
            <InputContainer>
                <Input setEmail={setEmail} setPassword={setPassword} value={email} id="email" type="text" placeholder="Email" />
                <Input setEmail={setEmail} setPassword={setPassword} value={password} id="password" type="password" placeholder="Password" />
            </InputContainer>
            <ButtonContainer>
                <SwitchMode mode={mode} setMode={setMode} submit={submit}/>
            </ButtonContainer>
            <LoginWith>or Login With</LoginWith>
            <Hr />
            <IconContainer>
                <Icon>
                    <button style={{
                        width: '3.5rem',
                        height: '3.5rem',
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer'
                    }} onClick={() => loginWithGoogle()}></button>
                </Icon>
            </IconContainer>
            <ForgotPassword>Forgot password ?</ForgotPassword>
        </MainContainer>
    );
};

export default Login;