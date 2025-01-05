import styled from 'styled-components';

export const CardWrapper = styled.div`
    position: absolute;
    top: 40px;
    left: 85%;
    transform: translateX(-50%);
    padding: 1rem;
    color: rgba(0, 0, 0, 0.8);
    background: rgba(255, 255, 255, 0.7);
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    width: 360px;
    max-width: 100%;
    min-height: 150px;
    font-family: 'Roboto', sans-serif;
    z-index: 1000;

    @media (max-width: 1024px) {
        min-height: 130px;
        left: 80%;
        width: 300px;

    }

    @media (max-width: 768px) {
        left: 75%;
        min-height: 120px;
    }

    @media (max-width: 425px) {
        top: 50px;
        left: 50%;
        padding: 0.8rem;
        min-height: 120px;
        width: calc(100% - 40px);
    }
`;

export const CardTitle = styled.h1`
    text-align: center;
    font-size: 1.5rem;

    @media (max-width: 768px) {
        font-size: 1rem;
    }
`;

export const CardList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

export const CardListItem = styled.li`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0.5rem 0;
    font-size: 16px;

    @media (max-width: 1024px) {
        font-size: 14px;
    }
`;

export const CardImage = styled.img`
    width: 40px;
    height: auto;
    margin-right: 8px;

    @media (max-width: 1024px) {
        width: 24px;
    }
`;

export const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 1.2rem;
    color: rgba(0, 0, 0, 0.8);
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    transition: background 0.3s ease, color 0.3s ease;
    z-index: 1100;

    &:hover {
        color: rgba(0, 0, 0, 1);
        background: rgba(0, 0, 0, 0.1);
    }

    @media (max-width: 768px) {
        font-size: 1rem;
        padding: 6px;
    }
`;

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    z-index: 999;
`;
