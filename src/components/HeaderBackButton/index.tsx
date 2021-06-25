import React from "react";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Grid, IconButton } from "@material-ui/core";
// import { Container } from './styles';

interface IHeaderBackButtonProps {
  onClick: () => void;
  title: string;
}

const HeaderBackButton = ({ onClick, title }: IHeaderBackButtonProps) => (
  <Grid container alignItems="center">
    <IconButton onClick={onClick}>
      <ArrowBackIcon />
    </IconButton>
    <h3 className="normal">{title}</h3>
  </Grid>
);

export default HeaderBackButton;
