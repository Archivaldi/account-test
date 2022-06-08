import styled from "styled-components";

const Icon = ({children}) => {
    return <StyledIcon>{children}</StyledIcon>
};

const StyledIcon = styled.div`
    height: 3.5rem;
    width: 3.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4rem;
    color: white;
    cursor: pointer;
    background-image: url("https://www.svgrepo.com/show/355037/google.svg");
    background-size: cover;
`;

export default Icon;