import React, { useState, useEffect } from "react";
import AppContext, { DEFAULT_CONFIGS, StateType } from "contexts/app";
import NetworkProvider from "contexts/network";
import Layout from "templates/Layout";
import { saveConfigs } from "utils/configs";
import { VideoProvider } from "components/Video";
import NetworkListener from "hooks/useNetworkListener";
import { muiTheme } from "theme";
import { ThemeProvider } from "@material-ui/core";
import Routes from "./Routes";

import "react-simple-keyboard/build/css/index.css";

function App() {
  const [globalState, setGlobalState] = useState(DEFAULT_CONFIGS);

  useEffect(() => {
    saveConfigs(globalState);
  }, [globalState]);

  const handleSetGlobalState = (state: StateType, value: any) => {
    setGlobalState({ ...globalState, [state]: value });
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <AppContext.Provider value={{ state: globalState, update: handleSetGlobalState }}>
        <VideoProvider>
          <NetworkProvider>
            <NetworkListener />
            <Layout>
              <Routes />
            </Layout>
          </NetworkProvider>
        </VideoProvider>
      </AppContext.Provider>
    </ThemeProvider>
  );
}

export default App;
