/* eslint react/prop-types: 0 */

import { getDeviceStatus } from "api/device";
import React, { useState, useEffect, useRef } from "react";
import { VIDEO_STATUS } from "./constants";

export const VideoContext = React.createContext(null);

export const VideoProvider = (props: any) => {
  const retryConnection = useRef(false);
  const deviceConnectionInterval = useRef<any>(null);

  const [state, _setState] = useState({
    status: "",
    m3u8: "",
    visible: false,
    fullScreen: false,
  });

  const setState = (attr: any) => {
    _setState((s) => ({ ...s, ...attr }));
  };

  useEffect(() => {
    connectDevice();
  }, []);

  const connectDevice = async () => {
    setState({ ...state, status: VIDEO_STATUS.LOADING });

    try {
      const fakeResponse = {
        status: 200,
        data: {
          m3u8: "http://172.20.200.31:8100/main.m3u8",
          online: true,
        },
      };
      // const response = await getDeviceStatus()
      const response = fakeResponse;
      processDeviceResponse(response);
    } catch (error) {
      processDeviceError(error.response);
    }
  };

  const retryDeviceConnection = () => {
    setState({ status: VIDEO_STATUS.LOADING });

    const retry = () => {
      if (retryConnection.current) {
        console.info("[VideoContext] Trying reconnect device");
        retryConnection.current = false;
        retryConnectDevice();
      }
    };

    deviceConnectionInterval.current = setInterval(retry, 7 * 1000);
  };

  const toggle = (props) => {
    setState(props);
  };
  const setStatus = (status) => setState({ status });

  const retryConnectDevice = async () => {
    try {
      const response = await getDeviceStatus();
      const { status, data } = response;

      if (status === 200 && data.online && data.m3u8) {
        console.info("Reconnected");
        clearInterval(deviceConnectionInterval.current);
        setState({ m3u8: data.m3u8, status: VIDEO_STATUS.PLAYING });
        return;
      }

      retryConnection.current = true;
    } catch (error) {
      console.trace(error);
    }
  };

  const processDeviceError = (response) => {
    if (response) {
      console.log("error", response);
      setState({ status: VIDEO_STATUS.LOADING });
    }
  };

  const processDeviceResponse = (response) => {
    const { status, data } = response;

    if (status === 200 && data.online) {
      setState({ m3u8: data.m3u8, status: VIDEO_STATUS.PLAYING });
    } else {
      retryConnection.current = true;
      setState({ status: VIDEO_STATUS.LOADING });
      retryDeviceConnection();
    }
  };

  const { status, m3u8, visible, fullScreen } = state;

  return (
    <VideoContext.Provider
      value={{
        status,
        m3u8,
        visible,
        fullScreen,
        toggle,
        setStatus,
        retryDeviceConnection,
      }}
    >
      {props.children}
    </VideoContext.Provider>
  );
};
