import React, { useContext, useState, useEffect } from "react";
import {
  Button,
  Card as MaterialUiCard,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  CardHeader,
  Grid,
  LinearProgress,
} from "@material-ui/core";
import isTouchSupported from "utils/touch";
import SelectDevice from "components/SelectDevice";
import AppContext from "contexts/app";
import ReactCodeInput from "react-code-input";
import styled from "styled-components";
import { setToken } from "api/token";

const Card = styled(MaterialUiCard)`
  min-height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

interface IStepProps {
  onNext: () => void;
}

export const FirstStep = ({ onNext }: IStepProps) => (
  <Card elevation={2}>
    <div>
      <CardMedia
        component="img"
        alt="welcome"
        height="250"
        image="https://iam.vlab.live/static/media/login-bg.9c595754.jpg"
      />
    </div>
    <CardHeader title="Seja bem vindo" />
    <CardContent>
      <p className="spacing-x2">Para começar precisamos realizar algumas configurações iniciais.</p>
    </CardContent>
    <CardActions>
      <Grid container justify="flex-end">
        <Button color="primary" onClick={onNext}>
          Próximo
        </Button>
      </Grid>
    </CardActions>
  </Card>
);

const TouchSupportedMessage = () => (
  <p className="spacing-x2">Detectamos que seu dispositivo suporta touch screen.</p>
);
const TouchNotSupportedMessage = () => (
  <p className="spacing-x2">Detectamos que seu dispositivo não suporta touch screen.</p>
);

export const SecondStep = ({ onNext }: IStepProps) => {
  const { state, update } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);

  const touchSupported: boolean = isTouchSupported();
  return (
    <Card elevation={2}>
      <CardMedia
        component="img"
        alt="welcome"
        height="250"
        width="100%"
        image="https://iam.vlab.live/static/media/login-bg.9c595754.jpg"
      />
      <CardHeader title="Tipo de dispositivo" />
      <CardContent>
        {touchSupported ? <TouchSupportedMessage /> : <TouchNotSupportedMessage />}

        <p className="spacing-x2">
          Modo de utilização:{" "}
          <b>{state.mode === "tablet" ? "Tela Touch Screen" : "Teclado/Mouse"}</b>
        </p>

        {isEditing && (
          <Grid container justify="center" className="spacing-x2">
            <SelectDevice
              handleDeviceChange={(mode) => {
                update("mode", mode);
                setIsEditing(false);
              }}
              device={state.mode}
            />
          </Grid>
        )}
      </CardContent>
      <CardActions>
        <Grid container justify="flex-end">
          <Button
            color="default"
            variant="outlined"
            className="mr"
            onClick={() => setIsEditing(true)}
          >
            Alterar
          </Button>
          <Button color="primary" onClick={onNext}>
            Próximo
          </Button>
        </Grid>
      </CardActions>
    </Card>
  );
};

interface IThirdStepProps extends IStepProps {
  handleChange: (activationCode: string) => void;
  activationCode: string;
}

export const ThirdStep = ({ onNext, handleChange, activationCode }: IThirdStepProps) => {
  const { state, update } = useContext(AppContext);
  const [showCodeInput, setShowCodeInput] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (state.mode === "tablet") {
      setShowCodeInput(false);
    }
  }, [activationCode]);

  useEffect(() => {
    if (!showCodeInput) {
      setShowCodeInput(true);
    }
  }, [showCodeInput]);

  const handleActivate = async () => {
    setLoading(true);

    try {
      await setToken(activationCode);
      update("activationCode", activationCode);
    } catch (err) {
      console.log("Erro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card elevation={2}>
      <CardMedia
        component="img"
        alt="welcome"
        height="250"
        width="100%"
        image="https://iam.vlab.live/static/media/login-bg.9c595754.jpg"
      />
      <CardHeader title="Ativação" />
      <CardContent>
        <p className="spacing-x2">
          Insira o código de ativação adquirido junto com a licença de uso.
        </p>
        <Grid container justify="center">
          {showCodeInput && (
            <ReactCodeInput
              inputMode="tel"
              name="code-input"
              type="text"
              value={activationCode}
              onChange={handleChange}
              fields={6}
              inputStyle={{
                fontWeight: "normal",
                margin: 6,
                MozAppearance: "textfield",
                borderRadius: 3,
                fontSize: 14,
                width: 20,
                height: 24,
                paddingLeft: 4,
                borderWidth: 1,
              }}
            />
          )}
        </Grid>
      </CardContent>
      <CardActions>
        <Grid container justify="flex-end">
          <Button color="primary" onClick={handleActivate} disabled={loading}>
            Próximo
          </Button>
        </Grid>
      </CardActions>
      {loading && <LinearProgress />}
    </Card>
  );
};
