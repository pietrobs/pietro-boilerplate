import styled from "styled-components";

const ActivationCodePageContainer = styled.div`
  .logo {
    position: absolute;
    top: 40px;
    margin: 0 auto;
    height: 40px;
  }

  .action {
    display: flex;
    justify-content: flex-end;
  }

  .steps {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .step {
      width: 80%;
      max-width: 400px;

      @media screen and (max-width: 768px) {
        width: 90%;
        max-width: none;
      }
    }
  }

  .keyboard-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    .react-simple-keyboard {
      width: 80%;
      max-width: 200px;
    }
  }
`;

export default ActivationCodePageContainer;
