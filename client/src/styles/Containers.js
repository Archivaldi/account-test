import styled from "styled-components";
import "./animation.css";

export const MainContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 80vh;
    width: 30vw;
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(8.5px);
    border-radius: 10px;
    color: #ffffff;
    text-transform: uppercase;
    letter-spacing: 0.4rem;
    animation-name: form;
    animation-duration: 1s;

    @media only screen and (max-width: 320px) {
        width: 80vw;
        height: 95vh;
        letter-spacing: 0.1rem;

        hr {
            margin-bottom: 0.3rem;
        }

        h4 {
            font-size: small;
        }

        .inputContainer {
            height: 35%;
        }

        .mode {
            flex-direction: column;
        }

        #btn {
            width: 100%;
            margin: 0.5rem 0;
        }
    }

    @media only screen and (min-width: 321px) {
        width: 80vw;
        height: 95vh;
        letter-spacing: 0.1rem;

        h4 {
            font-size: small;
        }

        .inputContainer {
            height: 35%;
        }

        .mode {
            flex-direction: column;
        }

        #btn {
            width: 100%;
            margin: 0.5rem 0;
        }
    }

    @media only screen and (min-width: 411px) {
        width: 80vw;
        height: 90vh;
    }

    @media only screen and (min-width: 470px) {
        width: 80vw;
        height: 95vh;

        .mode {
            flex-direction: row;
        }

        #btn {
            width: 45%;
            margin: 1rem;
        }
    }

    @media only screen and (min-width: 611px) {
        width: 60vw;
        height: 90vh;
        letter-spacing: 0.3rem;
    }

    @media only screen and (min-width: 860px) {
        width: 50vw;
        height: 90vh;
    }

    @media only screen and (min-width: 1024px) {
        width: 30vw;
        height: 80vh;
    }
`;

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 20%;
    width: 100%;
`;

export const ButtonContainer = styled.div`
    margin: 1rem 0 2rem 0;
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const IconContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin: 2rem 0 3rem 0;
    width: 80%;
`;

export const IndexConteiner = styled.div`
    display: flex;
    flex-direction: row;
    width: 80vw;
    height: 80vh;

    @media only screen and (max-width: 320px) {
        flex-direction: column; 
        width: 95vw;
        height: 95vh;
        align-items: center;

        .imageContainer {
            width: 100%;
        }

        .infoContainer {
            width: 100%;
        }

        .about {
            text-align: center;
        }
    };

    @media only screen and (min-width: 321px) {
        flex-direction: column; 
        width: 95vw;
        height: 95vh;
        align-items: center;

        .imageContainer {
            width: 100%;
        }

        .infoContainer {
            width: 100%;
        }

        .about {
            text-align: center;
        }
    };

    @media only screen and (min-width: 371px) {
        width: 95vw;
        height: 95vh;

        .imageContainer {
            width: 90%;
            height: 35%;
        }
    };

    @media only screen and (min-width: 471px) {
        width: 90vw;
        height: 95vh;

        .imageContainer {
            width: 80%;
            height: 35%;
        }
    };

    @media only screen and (min-width: 611px) {
        width: 80vw;
        height: 80vh;
        flex-direction: row; 
        align-items: start;

        .imageContainer {
            width: 45%;
        }

        .infoContainer {
            width: 55%;
        }

        .name {
            margin: 0;
        }

    }

    @media only screen and (min-width: 860px) {
        .imageContainer {
            height: 40vh;
        }
    }


`;

export const InfoContainer = styled.div`
    width: 45%;
    height: 50%;  
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;