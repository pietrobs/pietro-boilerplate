import { IConfigs } from "contexts/app";
import { STORAGE_KEY } from "configs";

export const saveConfigs = (globalConfig: IConfigs) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(globalConfig));
};

export const getConfigs = (): IConfigs | null => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? { ...JSON.parse(stored), stream: null } : null;
};
