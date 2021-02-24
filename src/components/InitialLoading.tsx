import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const InitialLoading = () => (
  <Container>
    <h1>
      {"<"}LOADING COMPONENT{">"}
    </h1>
  </Container>
);

export default InitialLoading;
