import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useGoogleLogin } from '@react-oauth/google';
import { MainContainer, InputContainer, ButtonContainer, IconContainer } from "../styles/Containers";
import Input from "../components/Input";
import Icon from "../components/Icon";
import { Hr, LoginWith, WelcomeText, ForgotPassword } from "../styles/Helpers";
import SwitchMode from "../components/SwitchMode";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error";
import validator from 'validator';


axios.defaults.withCredentials = true;

const Login = (props) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(undefined);
    const [mode, setMode] = useState("login");
    const { value, setValue } = useContext(UserContext);
    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState();


    const submit = async (info) => {
        try {
            const isValidEmail = validator.isEmail(email);
            if (isValidEmail && password.length > 8) {
                    if (mode === 'login') {
                        if (email && password) {
                            const isValidEmail = validator.isEmail(email);

                            try {
                                const response = await axios.post("/user/login", { email, password });
                                setValue(response.data);
                                navigate("/");
                            } catch (e) {
                                console.log(e.response.data.error);
                                setError(e.response.data.error);
                            }
                        } else {
                            console.log("Email and Password are required to log in")
                            setError("Email and Password are required to log in");
                        }
                    } else {
                        console.log(email, password, name, avatar);
                        if (email && password && name && avatar) {

                            const formData = new FormData();
                            formData.append('file', avatar);
                            formData.append("name", avatar.name);
                            const response = await axios.post("/user/signup", { email, password, name });
                            const id = response.data.user.id;
                            const pictureResponse = await axios.post(`/user/upload-picture?id=${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
                            const { picture } = pictureResponse.data;
                            const newUser = {
                                access_token: response.data.access_token,
                                user: {
                                    id,
                                    email: response.data.user.email,
                                    name: response.data.user.name,
                                    picture
                                }
                            };

                            setValue(newUser);
                            navigate("/");
                        } else {
                            setError("Please fill out all fields");
                        }
                    }
                } else {
                    isValidEmail ? setError("The password should be at least 8 characters long") : setError("Please provide a valid Email");
                }
            } catch (e) {
                setError(e.response.data.error);
            };
        };

        const loginWithGoogle = useGoogleLogin({
            onSuccess: async (data) => {
                const response = await axios.post("http://localhost:3000/user/google-login", {
                    token: data.access_token
                });
                console.log(response.data);
                setValue(response.data);
                navigate("/");
            },
            onError: err => console.log(err)
        });


        return (
            <MainContainer>
                {
                    error ?
                        <Error message={error} />
                        : <WelcomeText>Welcome</WelcomeText>
                }
                {
                    mode === "login" ? (
                        <InputContainer>
                            <Input setError={setError} setEmail={setEmail} value={email} id="email" type="text" placeholder="Email" />
                            <Input setError={setError} setPassword={setPassword} value={password} id="password" type="password" placeholder="Password" />
                        </InputContainer>
                    ) : (
                        <InputContainer className="inputContainer">
                            <Input setEmail={setEmail} setError={setError} value={email} id="email" type="text" placeholder="Email" />
                            <Input setPassword={setPassword} setError={setError} value={password} id="password" type="password" placeholder="Password" />
                            <Input setName={setName} setError={setError} value={name} id="name" type="text" placeholder="Full Name" />
                            <Input setAvatar={setAvatar} setError={setError} id="file" type="file" placeholder="Choose Avatar" />
                        </InputContainer>
                    )
                }
                <ButtonContainer>
                    <SwitchMode mode={mode} setError={setError} setMode={setMode} submit={submit} />
                </ButtonContainer>
                <LoginWith>or {mode === "login" ? "Login" : "Sign Up"} With</LoginWith>
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
                <ForgotPassword onClick={() => {setError("This feature was not implemented yet")}}>Forgot password ?</ForgotPassword>
            </MainContainer>
        );
    };

    export default Login;