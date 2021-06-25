import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardHeader,
  CardMedia,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Hls from "hls.js";
import AppContext from "contexts/app";
import React, { useContext, useEffect, useRef } from "react";
import { Video } from "components/Video";

// import { Container } from './styles';

interface INewExamCard {
  onClick: () => void;
}

const NewExamCard = ({ onClick }: INewExamCard) => {
  const { state, update } = useContext(AppContext);
  const videoRef = useRef<HTMLVideoElement>();

  useEffect(() => {
    if (state.stream) {
      videoRef.current.srcObject = state.stream;
    }
  }, [state.stream]);

  return (
    <Card onClick={onClick}>
      <CardActionArea>
        {/* <CardHeader title={<h3 className="normal">Iniciar um novo exame</h3>} /> */}
        {/* <video autoPlay muted controls={false} ref={videoRef} style={{ width: "100%" }} /> */}
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
      <CardActions className="centralize" style={{ justifyContent: "flex-end" }}>
        <Button size="large" color="primary" startIcon={<AddIcon />}>
          Novo Exame
        </Button>
      </CardActions>
    </Card>
  );
};

export default NewExamCard;
