import { Button, FormControl, FormLabel, TextField } from "@material-ui/core";
import useModal from "hooks/useModal";
import React from "react";
import { getDisplayMedia } from "utils/screen";
import Snackbar from "./Snackbar";

// import { Container } from './styles';

interface ISelectOutputProps {
  handleOutputChange: (screen?: MediaStream) => void;
  onStop?: () => void;
  m3u8: string;
  setM3u8: Function;
}

const SelectOutput = ({ handleOutputChange, onStop, m3u8, setM3u8 }: ISelectOutputProps) => {
  const { visibility, openModal, closeModal } = useModal();

  // const handleChange = async () => {
  //   let screen;

  //   try {
  //     screen = await getDisplayMedia(onStop);
  //   } catch (err) {
  //     openModal();
  //     console.log(err);
  //   }
  //   handleOutputChange(screen);
  // };

  return (
    <>
      <FormControl component="fieldset">
        <FormLabel component="legend">Configurações de captura: </FormLabel>

        <TextField
          fullWidth
          label="Url encoder"
          variant="outlined"
          className="spacing-x2"
          value={m3u8}
          onChange={(e) => setM3u8(e.target.value)}
        />
        <Button
          onClick={() => {
            handleOutputChange();
          }}
          variant="outlined"
          color="primary"
          className="spacing-x2"
        >
          Alterar
        </Button>
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
