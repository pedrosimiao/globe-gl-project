import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box; /* Garante consistência no modelo de caixa */
    }

    #root {
        height: 100%; /* Faz com que o conteúdo ocupe toda a altura */
        display: flex; /* Ajuda no alinhamento de conteúdo */
        flex-direction: column;
    }

    body {
        margin: 0;
        padding: 0;
        background-color: #000011;
        color: white; /* Define a cor do texto, se necessário */
        width: 100%;
        height: 100vh;
        cursor: default;
        user-select: none;

    }

    canvas {
        cursor: auto;
        user-select: none;
    }
`;

export default GlobalStyle;
