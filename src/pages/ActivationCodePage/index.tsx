import { Grid, IconButton } from "@material-ui/core";
import StepIndicator from "components/StepsIndicator";
import AppContext from "contexts/app";
import useStepper from "hooks/useStepper";
import React, { useContext, useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Keyboard from "react-simple-keyboard";
import { FirstStep, SecondStep, ThirdStep } from "./components/Steps";
import ActivationCodePageContainer from "./styles";

// import { Container } from './styles';

const ActivationCodePageDesktop = () => {
  const { state, update } = useContext(AppContext);
  const { currentStep, nextStep, previousStep } = useStepper();
  const [activationCode, setActivationCode] = useState("");

  const showKeyboard = state.mode === "tablet" || state.terminal;

  useEffect(() => {
    console.log("useEffect", activationCode);
  }, [activationCode]);

  const handleChangeKeyboard = (key: any) => {
    const backspace = "{bksp}";

    if (key === backspace) {
      console.log("backspace", key);
      setActivationCode((ac) => ac.substr(0, ac.length - 1));
    } else {
      setActivationCode((ac) => (ac.length < 6 ? `${activationCode}${key}` : ac));
    }
  };

  return (
    <ActivationCodePageContainer className="full-screen centralized column">
      <img
        src="https://organizations-assets.s3-sa-east-1.amazonaws.com/vlabWhite.png"
        alt="vlab-logo"
        className="logo"
      />

      <Grid container justify="center" spacing={4}>
        <Grid item lg={showKeyboard ? 6 : 12} md={showKeyboard ? 8 : 12} sm={12}>
          <StepIndicator count={3} activeStep={currentStep} className="spacing-x2" />

          <div className="steps">
            <IconButton onClick={previousStep} disabled={currentStep === 0}>
              <IoIosArrowBack size={28} className="step-arrow" />
            </IconButton>

            <div className="step">
              {currentStep === 0 && <FirstStep onNext={nextStep} />}
              {currentStep === 1 && <SecondStep onNext={nextStep} />}
              {currentStep === 2 && (
                <ThirdStep
                  onNext={nextStep}
                  activationCode={activationCode}
                  handleChange={setActivationCode}
                />
              )}
            </div>

            <IconButton onClick={nextStep} disabled={currentStep === 2}>
              <IoIosArrowForward size={28} className="step-arrow" />
            </IconButton>
          </div>
        </Grid>
        {showKeyboard && (
          <Grid item md={4} lg={6} sm={12} className="keyboard-container">
            <Keyboard
              layout={{ default: ["1 2 3", "4 5 6", "7 8 9", ". 0 {bksp}"] }}
              onKeyPress={handleChangeKeyboard}
            />
          </Grid>
        )}
      </Grid>
    </ActivationCodePageContainer>
  );
};

export default ActivationCodePageDesktop;
