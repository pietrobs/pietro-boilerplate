import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --timeout: 500ms;
    --list-item-max-height: 30px;
}

    /* Global Style */

    body {
        position: absolute;
        margin: 0;
        padding: 0;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        font-family: 'Encode Sans', sans-serif;
    }

    .App {
        position: relative;
    }

    section.route-section {
        position: absolute;
        width: 100%;
        height: 100vh;
        overflow: hidden;
    }

    /* End Global Style */

    /* Fade transition */

    .fade-enter {
        opacity: 0;
    }

    .fade-enter.fade-enter-active {
        opacity: 1;
        transition: opacity var(--timeout) ease-in;
    }

    .fade-exit {
        opacity: 1;
    }

    .fade-exit.fade-exit-active {
        opacity: 0;
        transition: all var(--timeout);
    }

    /* End Fade transition */
`;

export default GlobalStyle;
