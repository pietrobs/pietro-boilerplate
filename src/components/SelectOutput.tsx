import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  InputLabel,
  InputAdornment,
  Input,
  Paper,
  FormHelperText,
} from "@material-ui/core";
import useModal from "hooks/useModal";
import React, { useState } from "react";
import { getDisplayMedia } from "utils/screen";
import Snackbar from "./Snackbar";
import CheckIcon from "@material-ui/icons/Check";

// import { Container } from './styles';

interface ISelectOutputProps {
  handleOutputChange: () => void;
  m3u8: string;
  setM3u8: Function;
}

const SelectOutput = ({ handleOutputChange, m3u8, setM3u8 }: ISelectOutputProps) => {
  const { visibility, openModal, closeModal } = useModal();
  const [edited, setEdited] = useState(false);

  const handleChange = (e) => {
    setM3u8(e.target.value);
    setEdited(true);
  };

  const handleSave = () => {
    handleOutputChange();
    setEdited(false);
  };

  return (
    <>
      <FormControl component="fieldset" fullWidth>
        <FormLabel component="legend">URL do encoder:</FormLabel>

        <Input
          id="standard-adornment-password"
          type="text"
          value={m3u8}
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton type="submit" aria-label="search" onClick={handleSave}>
                <CheckIcon />
              </IconButton>
            </InputAdornment>
          }
        />
        {edited && (
          <FormHelperText style={{ display: "flex", alignItems: "center" }}>
            Clique em <CheckIcon style={{ margin: "0px 4px" }} /> para confirmar
          </FormHelperText>
        )}
      </FormControl>
      <Snackbar
        visible={visibility}
        handleClose={closeModal}
        message="Nenhum input de vídeo configurado"
        position={{
          vertical: "bottom",
          horizontal: "center",
        }}
      />
    </>
  );
};

export default SelectOutput;
