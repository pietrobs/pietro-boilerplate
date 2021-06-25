import { useState } from "react";

const useModal = () => {
  const [visibility, setVisibility] = useState(false);

  const openModal = () => {
    setVisibility(true);
  };

  const closeModal = () => {
    setVisibility(false);
  };

  return { visibility, openModal, closeModal };
};

export default useModal;
