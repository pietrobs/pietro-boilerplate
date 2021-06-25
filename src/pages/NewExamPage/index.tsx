import { Grid } from "@material-ui/core";
import AppContext from "contexts/app";
import React, { useContext, useState } from "react";
import { getDisplayMedia } from "utils/screen";
import NewExamCard from "./components/NewExamCard";
import NewExamForm from "./components/NewExamForm";

// import { Container } from './styles';

const NewExamPage: React.FC = () => {
  const { state, update } = useContext(AppContext);
  const [showIdentificationField, setShowIdentificationField] = useState(false);

  const onStop = () => {
    update("stream", null);
  };

  const handleCardClick = async () => {
    if (!state.m3u8) {
      alert("Necessário configurar a fonte de vídeo");
    } else {
      setShowIdentificationField(true);
    }
  };

  const handleFormBack = () => {
    setShowIdentificationField(false);
  };

  const handleFormConfirm = (identification: string, phone: string) => {};

  if (showIdentificationField) {
    return <NewExamForm onBack={handleFormBack} onConfirm={handleFormConfirm} />;
  }

  return (
    <Grid container>
      <Grid item md={3} xs={12}>
        <NewExamCard onClick={handleCardClick} />
      </Grid>
    </Grid>
  );
};

export default NewExamPage;
