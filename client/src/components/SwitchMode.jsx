import React from "react";
import Button from "./Button";
import styled from "styled-components";

const SwitchMode = ({mode, setMode, submit}) => {
    return (
        <CustomSwitch>
            <Button submit={submit} content={mode === 'login' ? "Login" : "Sign Up"} />
            <div style={{ margin: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', width: "45%", textDecoration: "underline" }}>
                <button onClick={() => setMode(mode === "login" ? "signup" : 'login')} style={{ width: '100%', border: 'none', color: 'white', background: 'none', fontSize: '0.8rem', cursor: 'pointer' }}>
                  {mode === "login" ?  "Don't have an account?" : "Have an account?"}
                   
                </button>
            </div>
        </CustomSwitch>
    )
};

const CustomSwitch = styled.div`
    width: 90%; 
    display: flex;
    alignItems: center;
    justifyContent: space-between;  
`;

export default SwitchMode;