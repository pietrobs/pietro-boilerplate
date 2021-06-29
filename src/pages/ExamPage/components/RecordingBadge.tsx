import React from "react";
import styled from "styled-components";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

const RecordingBadgeContainer = styled.div`
  background: red;
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 24px;
  left: 24px;
  padding: 4px 8px;
  border-radius: 8px;
  opacity: 1;
  animation: fade 2s linear infinite;

  @keyframes fade {
    0%,
    100% {
      opacity: 0.2;
    }
    50% {
      opacity: 1;
    }
  }
`;
// import { Container } from './styles';

const RecordingBadge: React.FC = () => (
  <RecordingBadgeContainer>
    <FiberManualRecordIcon />
    <p>GRAVANDO</p>
  </RecordingBadgeContainer>
);

export default RecordingBadge;
