import {styled, keyframes} from "styled-components";

const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

export const SpinnerWrapper = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 100%;
    z-index: 1000;
`;

export const RingSpinner = styled.div`
    width: 80px;
    height: 80px;
    border: 8px solid transparent;
    border-top: 8px solid #3498db; /* Cor azul */
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
`;



// rgba(0, 0, 190, 0.6)