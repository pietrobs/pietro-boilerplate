import React, { createContext, useContext, useEffect, useState } from "react";

const testNetworkConfig = async () => {
  const rand = Math.ceil(Math.random() * 1000);

  return rand % 2 === 0;
};

const NetworkContext = createContext(null);
const useNetworkContext = () => useContext(NetworkContext);

interface INetworkProviderProps {
  children: any;
}

const NetworkProvider = ({ children }: INetworkProviderProps) => {
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const sec2ms = (n) => n * 1000;
  const sendRequest = async () => {
    try {
      await testNetworkConfig();
      setIsOnline(true);
    } catch (err) {
      setIsOnline(false);
    }
  };

  useEffect(() => {
    let interval = null;
    const updateNetwork = () => {
      if (!window.navigator.onLine) {
        setIsOnline(false);
      } else {
        if (interval) {
          clearInterval(interval);
        }
        sendRequest();
        interval = setInterval(sendRequest, sec2ms(7));
      }
    };

    updateNetwork();
    window.addEventListener("offline", updateNetwork);
    window.addEventListener("online", updateNetwork);
    return () => {
      if (interval) {
        clearInterval(interval);
      }
      window.removeEventListener("offline", updateNetwork);
      window.removeEventListener("online", updateNetwork);
    };
  }, []);

  return <NetworkContext.Provider value={isOnline}>{children}</NetworkContext.Provider>;
};

export { useNetworkContext };
export default NetworkProvider;
