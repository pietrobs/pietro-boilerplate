import AppContext, { EModeType, EStateType } from "contexts/app";
import React, { useContext } from "react";

// import { Container } from './styles';

const useLoadPage = (desktopPage: any, mobilePage: any) => {
  const { state } = useContext(AppContext);

  const isDesktop = state.mode === EModeType.DESKTOP;

  return isDesktop ? desktopPage : mobilePage;
};

export default useLoadPage;
