import styled from "styled-components";
import { InfoContainer } from "../styles/Containers";
import { WelcomeText } from "../styles/Helpers";
import Button from "./Button";

const Info = ({ name, logout}) => {
    return (
        <InfoContainer>
            <WelcomeText>{name}</WelcomeText>
            <Button submit={logout} content="Lou Out"></Button>
        </InfoContainer>
    );
};

export default Info;