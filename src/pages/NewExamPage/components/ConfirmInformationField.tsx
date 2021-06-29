import React from "react";

// import { Container } from './styles';

interface IConfirmInformationFieldProps {
  label: string;
  value: any;
}

const ConfirmInformationField = ({ label, value }: IConfirmInformationFieldProps) => (
  <div className="centralized column" style={{ overflowWrap: "anywhere", textAlign: "center" }}>
    <caption className="text-regent-gray">{label}</caption>
    <h3 className="text-primary">{value}</h3>
  </div>
);

export default ConfirmInformationField;
