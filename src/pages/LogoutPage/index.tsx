import { Button, Grid } from "@material-ui/core";
import AppContext from "contexts/app";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

// import { Container } from './styles';

const LogoutPage: React.FC = () => {
  const { state, update } = useContext(AppContext);
  const history = useHistory();

  const handleLogout = () => {
    update("activationCode", "");
    history.replace("/");
  };

  const goBack = () => {
    history.goBack();
  };

  return (
    <div className="full-screen centralized column">
      <p>Tem certeza que deseja sair?</p>
      <div className="spacing-x2">
        <Button size="large" onClick={handleLogout} variant="contained" color="primary">
          Sair
        </Button>
        <Button size="large" onClick={goBack}>
          Cancelar
        </Button>
      </div>
    </div>
  );
};

export default LogoutPage;
