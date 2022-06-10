import styled from "styled-components";
import "../styles/animation.css";

const Error = ({message}) => {
    return (
        <ErrorContainer>
            {message}
        </ErrorContainer>
    )
};

const ErrorContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4rem;
    width: 80%;
    height: 3rem;
    padding: 1.5rem;
    letter-spacing: 0.5rem;
    text-align: center;
    line-height: 1.5;
    color: red;
    margin: 3rem 0 2rem 0;
    font-size: 0.7rem;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(20px);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    animation-name: error;
    animation-duration: 1s;
`;

export default Error;