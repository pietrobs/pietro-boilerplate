import { Grid } from "@material-ui/core";
import { BillingType } from "api/consts";
import { getExamRunning, getExams, IRunningExam, startExam, stopExam } from "api/exam";
import AppContext from "contexts/app";
import moment from "moment";
import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import generateGuid from "utils/guid";
import { getDisplayMedia } from "utils/screen";
import NewExamCard from "./components/NewExamCard";
import NewExamForm from "./components/NewExamForm";
import RunningExamAlert from "./components/RunningExamAlert";
import RunningExamCard from "./components/RunningExamCard";

// import { Container } from './styles';

const NewExamPage: React.FC = () => {
  const { state, update } = useContext(AppContext);
  const history = useHistory();
  const [showForm, setShowForm] = useState(false);
  const [runningExam, setRunningExam] = useState<IRunningExam | null>(null);

  const loadRunningExam = async () => {
    await getExams();
    const response = await getExamRunning();
    setRunningExam(response.data);
  };

  useEffect(() => {
    loadRunningExam();
  }, []);

  const handleStopRunningExam = async () => {
    try {
      await stopExam();
      setRunningExam(null);
    } catch (err) {
      console.log("handleStopRunningExam error", err);
    }
  };

  const handleCardClick = async () => {
    if (!state.m3u8) {
      alert("Necessário configurar a fonte de vídeo");
    } else {
      setShowForm(true);
    }
  };

  const handleFormBack = () => {
    setShowForm(false);
  };

  const handleView = () => {
    history.replace(`/exam/${runningExam.elapsed_time}`);
  };

  const handleFormConfirm = async (accessCode: string, identification: string, phone: string) => {
    try {
      const payload = {
        accessCode,
        id: generateGuid(),
        scheduled: moment().add(5, "minute").toISOString(),
        phones: [phone],
        patient_identifier: phone,
        billing_type: BillingType.UNKNOWN,
      };

      await startExam(payload);
      history.replace("/exam");
    } catch (err) {
      console.log("handleFormConfirm error", err);
    }
  };

  if (showForm) {
    return <NewExamForm onBack={handleFormBack} onConfirm={handleFormConfirm} />;
  }

  return (
    <>
      {runningExam && <RunningExamAlert />}
      <Grid container>
        <Grid item md={6} xs={12}>
          {runningExam ? (
            <RunningExamCard
              onClick={handleView}
              time={runningExam.elapsed_time}
              onStop={handleStopRunningExam}
            />
          ) : (
            <NewExamCard onClick={handleCardClick} />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default NewExamPage;
