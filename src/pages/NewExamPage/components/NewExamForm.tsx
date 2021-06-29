import {
  Button,
  Grid,
  TextField,
  Card,
  CardActionArea,
  CardActions,
  Divider,
} from "@material-ui/core";
import HeaderBackButton from "components/HeaderBackButton";
import Modal from "components/Modal";
import PhoneMask from "components/PhoneMask";
import AppContext from "contexts/app";
import useModal from "hooks/useModal";
import React, { useContext, useState } from "react";
import Keyboard from "react-simple-keyboard";
import { unmaskCellphone } from "utils";
import generateAccessCode from "utils/accessCode";
import ConfirmInformationField from "./ConfirmInformationField";

// import { Container } from './styles';

interface INewExamFormProps {
  onBack: () => void;
  onConfirm: (accessCode: string, identification: string, phone: string) => void;
}

const NewExamForm = ({ onBack, onConfirm }: INewExamFormProps) => {
  const { state } = useContext(AppContext);
  const { visibility, openModal, closeModal } = useModal();
  const [identification, setIdentification] = useState("");
  const [phone, setPhone] = useState("");
  const [identificationError, setIdentificationError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [accessCode, setAccessCode] = useState(generateAccessCode());

  const clearErrors = () => {
    setIdentificationError("");
    setPhoneError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearErrors();

    const phoneDigitsCount = unmaskCellphone(phone).length;

    console.log({ phoneDigitsCount });

    if (identification === "") {
      setIdentificationError("Preencha a identificação.");
      return;
    }

    if (identification.length < 6) {
      setIdentificationError("A identificação deve possuir no mínimo 6 digitos.");
      return;
    }

    if (phoneDigitsCount < 11) {
      setPhoneError("Preencha o telefone.");
      return;
    }

    // onConfirm(identification, phone);
    openModal();
  };

  const showKeyboard = state.mode === "tablet";
  return (
    <Grid container justify="space-between" style={{ height: "calc(100vh - 64px)" }} spacing={6}>
      <Grid container md={4}>
        <div style={{ width: "100%" }} className="pd-x2">
          <Card className="pd-x2">
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <CardActionArea>
                <HeaderBackButton title="Novo Exame" onClick={onBack} />
                <TextField
                  fullWidth
                  label="Identificação"
                  variant="outlined"
                  className="spacing-x2"
                  error={!!identificationError}
                  helperText={identificationError}
                  value={identification}
                  onChange={(e) => setIdentification(e.target.value)}
                />

                <TextField
                  fullWidth
                  label="Telefone"
                  variant="outlined"
                  InputProps={{ inputComponent: PhoneMask }}
                  className="spacing-x2"
                  error={!!phoneError}
                  helperText={phoneError}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </CardActionArea>
              <CardActions className="centralize" style={{ justifyContent: "flex-end" }}>
                <Button variant="contained" color="primary" fullWidth size="large" type="submit">
                  Confirmar
                </Button>
              </CardActions>
            </form>
          </Card>
        </div>
      </Grid>
      {showKeyboard && (
        <Grid
          container
          md={6}
          justify="center"
          alignItems="center"
          style={{ background: "rgb(220, 225, 228)" }}
        >
          <div className="limited-width">
            <Keyboard
              layout={{ default: ["1 2 3", "4 5 6", "7 8 9", ". 0 {bksp}"] }}
              onKeyPress={() => {}}
            />
          </div>
        </Grid>
      )}

      <Modal
        visible={visibility}
        handleClose={closeModal}
        title="Confirmação"
        content={
          <Grid container className="spacing-x2 no-spacing-bottom">
            <Grid md={4} sm={12}>
              <ConfirmInformationField label="Identificação" value={identification} />
            </Grid>
            <Grid md={4} sm={12}>
              <ConfirmInformationField label="Telefone" value={phone} />
            </Grid>
            <Grid md={4} sm={12}>
              <ConfirmInformationField label="Código de Acesso" value={accessCode} />
            </Grid>
            <Grid className="modal-footer" container justify="flex-end">
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => {
                  onConfirm(accessCode, identification, phone);
                }}
              >
                Iniciar exame
              </Button>
            </Grid>
          </Grid>
        }
      />
    </Grid>
  );
};

export default NewExamForm;
