import { createContext } from "react";
import { getConfigs } from "utils/configs";
import isTouchSupported from "utils/touch";

export type ModeType = "tablet" | "desktop";

export interface IConfigs {
  terminal: boolean;
  mode: ModeType;
  activationCode: string | null;
  stream: null | MediaStream;
  m3u8: string;
}

export type StateType = "mode" | "activationCode" | "stream" | "m3u8";

export enum EStateType {
  MODE = "mode",
  ACTIVATION_CODE = "activationCode",
}

export enum EModeType {
  DESKTOP = "desktop",
  TABLET = "tablet",
}

const getModeFromDeviceCapabilities = () => (isTouchSupported() ? "tablet" : "desktop");

export const DEFAULT_CONFIGS: IConfigs = getConfigs() || {
  terminal: false, // Pegar do env
  mode: getModeFromDeviceCapabilities(),
  activationCode: "",
  stream: null,
  m3u8: "",
};

interface IAppContext {
  state: IConfigs;
  update: (state: StateType, value: any) => void;
}

const AppContext = createContext<IAppContext>({ state: DEFAULT_CONFIGS, update: () => {} });

export default AppContext;
