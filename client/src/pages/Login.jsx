import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { refreshToken } from "../utils/auth";
import { MainContainer, InputContainer, ButtonContainer, IconContainer } from "../styles/Containers";
import Input from "../components/Input";
import Button from "../components/Button";
import Icon from "../components/Icon";
import { Hr, LoginWith, WelcomeText, ForgotPassword } from "../styles/Helpers";

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(undefined);
    const [user, setUser] = useState(null);

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

    const handleChange = (e) => {
        const value = e.target.value;
        const id = e.target.id;
        id === 'email' ? setEmail(value) : setPassword(value);
    };

    const submit = async () => {
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
                await axiosJWT.post("http://localhost:8080/user/logout", { refreshToken: user.refreshToken }, {
                    headers: {
                        "Content-Type": "application/json",
                        'authorization': `Bearer ${user.accessToken}`
                    },
                });
                setUser(null);
            }
        } catch (e) {
            console.log(e);
        };
    };

    return (
        <MainContainer>
            <WelcomeText>Welcome</WelcomeText>
            <InputContainer>
                <Input type="text" placeholder="Email" />
                <Input type="password" placeholder="Password" />
            </InputContainer>
            <ButtonContainer className="buttonContainer">
                <Button content={"Log In"} />
                <Button content={"Sign Up"} />
            </ButtonContainer>
            <LoginWith>or Login With</LoginWith>
            <Hr />
            <IconContainer>
                <Icon />
            </IconContainer>
            <ForgotPassword>Forgot password ?</ForgotPassword>
        </MainContainer>
        // <div>
        //     <label>Email: </label>
        //     <input value={email} id="email" onChange={(e) => handleChange(e)} />
        //     <label>Password: </label>
        //     <input value={password} id="password" onChange={(e) => handleChange(e)} />
        //     <button onClick={submit}>Submit</button>
        //     <button onClick={logout}>Logout</button>
        //     {
        //         user &&
        //         <div>
        //             {JSON.stringify(user, null, 2)}
        //         </div>
        //     }
        // </div>
    );
};

export default Login;