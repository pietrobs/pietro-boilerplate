export {};

export const unmaskCellphone = (cellphone: string) =>
  cellphone.replaceAll("_", "").replace("(", "").replace(")", "").replace(" ", "").replace("-", "");
