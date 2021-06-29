import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardHeader,
  CardMedia,
} from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import CloseIcon from "@material-ui/icons/Close";
import Hls from "hls.js";
import AppContext from "contexts/app";
import React, { useContext, useEffect, useRef } from "react";
import { Video } from "components/Video";
import TimeCounter from "components/TimeCounter";

// import { Container } from './styles';

interface IRunningExamCard {
  onClick: () => void;
  onStop: () => void;
  time: number;
}

const RunningExamCard = ({ onClick, onStop, time }: IRunningExamCard) => {
  const { state, update } = useContext(AppContext);
  const videoRef = useRef<HTMLVideoElement>();

  useEffect(() => {
    if (state.stream) {
      videoRef.current.srcObject = state.stream;
    }
  }, [state.stream]);

  return (
    <Card>
      <CardActionArea>
        {state.m3u8 ? (
          <Video />
        ) : (
          <CardMedia
            style={{ height: 240 }}
            image="https://img.freepik.com/free-vector/prenatal-care-sonographer-scanning-examining-pregnant-woman-while-expecting-father-looking-monitor-vector-illustration-medical-examination-sonography-ultrasound-test-topics_74855-8535.jpg?size=626&ext=jpg&ga=GA1.2.1965441054.1623542400"
            title="ultra sound"
          />
        )}
      </CardActionArea>
      <CardActions style={{ justifyContent: "space-between" }}>
        <Button
          onClick={() => onStop()}
          variant="outlined"
          size="large"
          color="primary"
          startIcon={<CloseIcon />}
        >
          Parar
        </Button>
        <TimeCounter init={time} />
        <Button
          onClick={onClick}
          variant="contained"
          size="large"
          color="primary"
          endIcon={<NavigateNextIcon />}
        >
          Continuar
        </Button>
      </CardActions>
    </Card>
  );
};

export default RunningExamCard;
