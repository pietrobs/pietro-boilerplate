import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --timeout: 500ms;
    --list-item-max-height: 30px;
    }

    *{
        margin: 0;
        padding: 0;
    }

    #root, .App {
        height: 100%;
    }

    body {
        position: absolute;
        margin: 0;
        padding: 0;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        font-family: 'Inter', sans-serif;
    }

    .App {
        position: relative;
        background-color: #F6F9FB;
        max-width: 100vw;
        overflow-x: hidden;
    }

    section.route-section {
        /* position: absolute;
        width: 100%;
        height: 100vh;
        overflow: hidden; */
    }















    /* Fade transition */

    .fade-enter {
        opacity: 0;
    }

    .fade-enter.fade-enter-active {
        opacity: 1;
        transform: translateY(5000);
        transition: all var(--timeout) ease-in;
    }

    .fade-exit {
        opacity: 1;
        transform: translateY(0);
    }

    .fade-exit.fade-exit-active {
        opacity: 0;
        transition: all var(--timeout);
    }

    /* End Fade transition */















    /* Global Class */

    .full-screen {
        min-height: calc(100% - 64px);
        width: 100%;
    }

    .centralized {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .column{
        flex-direction: column;
    }

    .flex{
        display: flex;
    }

    .justify-end{
        justify-content: flex-end;
    }

    .ml{
        margin-left: 8px !important;
    }

    .ml-x2{
        margin-left: 16px !important;
    }

    .mr{
        margin-right: 8px !important;
    }

    .mr-x2{
        margin-right: 16px !important;
    }

    .spacing{
        margin: 8px 0px;
    }

    .spacing-x2{
        margin: 16px 0px;
    }

    .spacing-x3{
        margin: 24px 0px;
    }

    .spacing-x4{
        margin: 32px 0px;
    }

    .no-spacing-bottom{
        margin-bottom: 0px;
    }

    .pd{
        padding: 8px;
    }

    .pd-x2{
        padding: 16px;
    }

    .pd-x3{
        padding: 24px;
    }

    .limited-width{
        width: 100%;
        max-width: 300px !important;
    }

    // Typography

    .bold{
        font-weight: 700;
    }

    .normal{
        font-weight: 500;
    }

    .light{
        font-weight: 300;
    }

    h1{
        font-size: 34px;
        letter-spacing: 0.25;
    }

    h2{
        font-size: 24px;
        letter-spacing: 0;
    }

    h3{
        font-size: 20px;
        letter-spacing: 0.15;
    }

    h4{
        font-size: 16px;
        letter-spacing: 0.15;
    }

    h5{
        font-size: 14px;
        letter-spacing: 0.10;
    }

    p{
        font-size: 16px;
        letter-spacing: 0.15;
    }

    span{
        font-size: 14px;
        letter-spacing: 0.20;
    }

    caption{
        font-size: 12px;
        letter-spacing: 0.40;
    }

    .text-button{
        font-size: 14px;
        letter-spacing: 0;
    }

    .primary{
        background-color: #1D5880;
    }

    .text-primary{
        color: #1D5880;
    }

    .secondary{
        background-color: #0F87C8;
    }

    .text-secondary{
        color: #0F87C8;
    }

    .terciary{
        background-color: #00AEEF;
    }

    .text-terciary{
        color: #00AEEF;
    }

    .dark-gray{
        background-color: #43474E;
    }

    .text-dark-gray{
        color: #43474E;
    }

    .dark-background{
        background-color: #28323B;
    }

    .text-dark-background{
        color: #28323B;
    }

    .regentGray{
        background-color: #7C8490;
    }

    .text-regentGray{
        color: #7C8490;
    }

    .lightGray{
        background-color: #D6DCE7;
    }

    .text-lightGray{
        color: #D6DCE7;
    }

    .lightBlue{
        background-color: #EBF6FD;
    }

    .text-lightBlue{
        color: #EBF6FD;
    }

    .extraLightBackground{
        background-color: #F6F9FB;
    }

    .text-extraLightBackground{
        color: #F6F9FB;
    }

    .error{
        background-color: #ED7872;
    }

    .text-error{
        color: #ED7872;
    }

    .success{
        background-color: #6BEA9F;
    }

    .text-success{
        color: #6BEA9F;
    }
`;

export default GlobalStyle;
