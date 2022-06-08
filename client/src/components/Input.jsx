import styled from "styled-components";

const Input = ({setEmail, setPassword,  type, placeholder, id }) => {
    const handleChange = (e) => {
        const value = e.target.value;
        id === 'email' ? setEmail(value) : setPassword(value);
    };
    return (
        <StyledInput onChange={(e) => handleChange(e)} type={type} placeholder={placeholder} />
    )
};

const StyledInput = styled.input`
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    border-radius: 2rem;
    width: 80%;
    height: 3rem;
    padding: 1rem;
    border: none;
    outline: none;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 1rem;
    &:focus {
        display: inline-block;
        box-shadow: 0 0 0 0.2rem #b9abe0;
        background-filter: blur(12rem);
        border-radius: 2rem;
    };
    &::placeholder {
        color: white;
        font-weight: 100;
        font-size: 1rem;
    }
`;

export default Input;