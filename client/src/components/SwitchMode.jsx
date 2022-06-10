import React from "react";
import Button from "./Button";
import styled from "styled-components";

const SwitchMode = ({ mode, setMode, submit, setError }) => {

    const reset = () => {
        setMode(mode === "login" ? "signup" : 'login');
        setError('');
    };

    return (
        <CustomSwitch>
            <ButtonConteiner>
                <Button  submit={submit} content={mode === 'login' ? "Login" : "Sign Up"} />
            </ButtonConteiner>
            <ButtonConteiner>
                <button onClick={reset} style={{
                    width: '100%',
                    border: '1px solid #345901',
                    color: 'white',
                    background: 'none',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    borderRadius: "4rem",
                    height: "3rem"
                }}>
                    {mode === "login" ? "Don't have an account?" : "Have an account?"}

                </button>
            </ButtonConteiner>
        </CustomSwitch>
    )
};

const CustomSwitch = styled.div`
    width: 90%; 
    display: flex;
    alignItems: center;
    justifyContent: space-evenly;  
`;

const ButtonConteiner = styled.div`
    margin: 1rem; 
    display: flex;
    alignItems: center;
    justifyContent: center;
    width: 45%; 
`;

export default SwitchMode;