import styled from "styled-components";

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

    @media only screen and (max-width: 320px) {
        width: 80vw;
        height: 95vh;
        letter-spacing: 0.1rem;

        .buttonContainer {
            flex-direction: column;
        };

        .btn {
            width: 100%;
            margin: 0.5rem;
        }

        hr {
            margin-bottom: 0.3rem;
        }

        h4 {
            font-size: small;
        }
    }

    @media only screen and (min-width: 321px) {
        width: 80vw;
        height: 95vh;
        letter-spacing: 0.1rem;

        .buttonContainer {
            flex-direction: column;
        };

        .btn {
            width: 100%;
            margin: 0.5rem;
        }

        h4 {
            font-size: small;
        }
    }

    @media only screen and (min-width: 411px) {
        width: 80vw;
        height: 90vh;

        .buttonContainer {
            flex-direction: column;
        };

        .btn {
            width: 100%;
            margin: 0.5rem;
        }
    }

    @media only screen and (min-width: 470px) {
        width: 80vw;
        height: 95vh;

        .buttonContainer {
            flex-direction: row;
        };

        .btn {
            width: 45%;
        }
    }

    @media only screen and (min-width: 611px) {
        width: 60vw;
        height: 90vh;
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
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`;

export const IconContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin: 2rem 0 3rem 0;
    width: 80%;
`;