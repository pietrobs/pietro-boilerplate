import React, { useState } from "react";

// import { Container } from './styles';

const useStepper = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => setCurrentStep((curr) => curr + 1);
  const previousStep = () => setCurrentStep((curr) => (curr - 1 >= 0 ? curr - 1 : 0));

  return { currentStep, nextStep, previousStep };
};

export default useStepper;
