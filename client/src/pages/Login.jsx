import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useGoogleLogin } from '@react-oauth/google';
import { MainContainer, InputContainer, ButtonContainer, IconContainer } from "../styles/Containers";
import Input from "../components/Input";
import Icon from "../components/Icon";
import { Hr, LoginWith, WelcomeText, ForgotPassword } from "../styles/Helpers";
import SwitchMode from "../components/SwitchMode";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom"

axios.defaults.withCredentials = true;

const Login = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(undefined);
    const [mode, setMode] = useState("login");
    const {value, setValue} = useContext(UserContext);


    const submit = async (info) => {
        if (email && password) {
            const response = await axios.post("http://localhost:8080/user/login", { email, password });
            setValue(response.data);
            navigate("/");
        } else {
            console.log("Email and Password are required to log in")
            setError("Email and Password are required to log in");
        }
    };

    const loginWithGoogle = useGoogleLogin({
        onSuccess: async data => {
            const response = await axios.post("http://localhost:3000/user/google-login", {
                token: data.access_token
            });
            setValue(response.data);
            navigate("/");
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