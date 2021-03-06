import styled from "styled-components";
import { ButtonContainer, InfoContainer } from "../styles/Containers";
import { WelcomeText, ForgotPassword } from "../styles/Helpers";
import Button from "./Button";

const Info = ({ name, logout, email }) => {
    return (
        <InfoContainer className="infoContainer">
            <WelcomeText className="name" style={{ marginBottom: 0 }}>{name}</WelcomeText>
            <WelcomeText className="email" style={{ marginBottom: 0 }}>{email}</WelcomeText>
            <div className="about" style={{
                width: '90%'
            }}>
                <ForgotPassword>About me: </ForgotPassword>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries, but also the leap
                    into electronic typesetting, remaining essentially unchanged. It was popularised in
                    the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and
                    more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
            <ButtonContainer>
                <Button submit={logout} content="Log Out"></Button>
            </ButtonContainer>
        </InfoContainer>
    );
};

export default Info;