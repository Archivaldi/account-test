import styled from "styled-components";

const Image = ({imageUrl}) => {
    return <ImageConteiner imageUrl={imageUrl} />
};

const ImageConteiner = styled.div`
    width: 45%;
    border-radius: 1rem;
    height: 40vh;
    background-image: ${(props) => `url(${props.imageUrl})`};
    background-size: cover;
    background-position: 50% 50%;

`;

export default Image;