import styled from "styled-components";

const Button = ({submit,content}) => {
    
    return (
        <StyledButton onClick={submit} className="btn" >{content}</StyledButton>
    )
};

const StyledButton = styled.button`
    background: #9bb33355;
    width: 100%;
    border-radius: 2rem;
    text-transform: uppercase;
    letter-spacing: 0.2rem;
    height: 3rem;
    border: none;
    color: white;
    cursor: pointer;
`;

export default Button;