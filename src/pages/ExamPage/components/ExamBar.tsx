import React from "react";
import styled from "styled-components";
import { IconButton, Button, Grid } from "@material-ui/core";
import TimeCounter from "components/TimeCounter";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CheckIcon from "@material-ui/icons/Check";
import { useHistory, useParams } from "react-router-dom";
import { disableExam, stopExam } from "api/exam";
import useModal from "hooks/useModal";
import Modal from "components/Modal";

const ExamBarContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 24px;
  background: white;
  border-radius: 8px;
  padding: 8px 16px;
  justify-content: space-between;
`;
// import { Container } from './styles';

interface IExamBarProps {
  init?: number;
}

const ExamBar = ({ init }: IExamBarProps) => {
  const history = useHistory();

  const { visibility, openModal, closeModal } = useModal();

  const onDiscard = async () => {
    try {
      await disableExam();
      history.replace("/");
    } catch (err) {
      console.log("onDiscard error", err);
    }
  };

  const onFinish = async () => {
    try {
      await stopExam();
      history.replace("/");
    } catch (err) {
      console.log("onFinish error", err);
    }
  };

  const handleDiscard = () => {
    openModal();
  };

  return (
    <ExamBarContainer>
      <Button variant="outlined" startIcon={<DeleteForeverIcon />} onClick={handleDiscard}>
        Descartar
      </Button>
      <TimeCounter init={init} />
      <Button variant="contained" color="primary" startIcon={<CheckIcon />} onClick={onFinish}>
        Encerrar exame
      </Button>

      <Modal
        visible={visibility}
        handleClose={closeModal}
        title="Descartar o exame?"
        content={
          <div>
            <p>O exame não estará disponível para o paciente.</p>
            <Grid container justify="flex-end" className="modal-footer">
              <Button onClick={closeModal} style={{ marginRight: 16 }}>
                Cancelar
              </Button>
              <Button onClick={onDiscard} color="primary" variant="contained">
                Descartar
              </Button>
            </Grid>
          </div>
        }
      />
    </ExamBarContainer>
  );
};

export default ExamBar;
