import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@material-ui/core";
import { EModeType, ModeType } from "contexts/app";
import React from "react";

// import { Container } from './styles';

interface ISelectDeviceProps {
  handleDeviceChange: (device: ModeType) => void;
  device: ModeType;
}

const SelectDevice = ({ handleDeviceChange, device }: ISelectDeviceProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: ModeType = e.target.value as ModeType;
    handleDeviceChange(value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Preferência de utilização: </FormLabel>
      <RadioGroup aria-label="device-type" value={device} onChange={handleChange}>
        <FormControlLabel
          value={EModeType.TABLET}
          control={<Radio />}
          label="Tela sensível a toque"
        />
        <FormControlLabel value={EModeType.DESKTOP} control={<Radio />} label="Mouse/Teclado" />
      </RadioGroup>
    </FormControl>
  );
};

export default SelectDevice;
