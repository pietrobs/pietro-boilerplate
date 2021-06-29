import { getExamRunning, IRunningExam } from "api/exam";
import { Video } from "components/Video";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ExamBar from "./components/ExamBar";
import RecordingBadge from "./components/RecordingBadge";

const ExamPageContainer = styled.div`
  position: relative;
  max-width: 800px;
`;

const ExamPage: React.FC = () => {
  const [runningExam, setRunningExam] = useState<IRunningExam | null>(null);

  const loadRunningExam = async () => {
    const response = await getExamRunning();
    setRunningExam(response.data);
  };

  useEffect(() => {
    loadRunningExam();
  }, []);

  if (!runningExam) {
    return <p>Carregando...</p>;
  }

  return (
    <ExamPageContainer>
      <RecordingBadge />
      <Video />
      <ExamBar init={runningExam.elapsed_time} />
    </ExamPageContainer>
  );
};

export default ExamPage;
