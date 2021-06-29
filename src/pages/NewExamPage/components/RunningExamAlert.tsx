import React from "react";
import { Alert, AlertTitle } from "@material-ui/lab";

// import { Container } from './styles';

const RunningExamAlert: React.FC = () => (
  <Alert severity="warning" className="spacing-x2">
    <AlertTitle>Exame em andamento</AlertTitle>
    Já existe um exame sendo gravado
  </Alert>
);

export default RunningExamAlert;
