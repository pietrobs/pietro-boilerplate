import React from "react";
import styled from "styled-components";

// import { Container } from './styles';

interface IStepIndicatorProps {
  count: number;
  activeStep: number;
  className?: string;
}

const StepIndicatorContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center; ;
`;

interface IStepIndicatorCircleProps {
  active: boolean;
}

const StepIndicatorCircle =
  styled.span <
  IStepIndicatorCircleProps >
  `
  width: ${({ active }) => (active ? "10px" : "6px")};
  height: ${({ active }) => (active ? "10px" : "6px")};
  border-radius: 50%;
  background-color: ${({ active }) => (active ? "#0F87C8" : "#D6DCE7")};
  margin: 0px 2px;

  transition: width 0.2s, height 0.2s;
`;

const StepIndicator = ({ count, activeStep, className }: IStepIndicatorProps) => (
  <StepIndicatorContainer className={className}>
    {[...Array(count).keys()].map((step, idx) => (
      <StepIndicatorCircle key={`step-indicator-${idx}`} active={activeStep === idx} />
    ))}
  </StepIndicatorContainer>
);

export default StepIndicator;
