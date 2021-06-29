import { getExamRunning, IRunningExam } from "api/exam";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ExamListPageContainer = styled.div``;

const ExamListPage: React.FC = () => {
  const [exams, setExams] = useState(null);

  const loadExams = async () => {
    // const response = await getExamRunning();
    setExams([]);
  };

  useEffect(() => {
    loadExams();
  }, []);

  if (!exams) {
    return <p>Carregando...</p>;
  }

  return <ExamListPageContainer>Implementar API</ExamListPageContainer>;
};

export default ExamListPage;
