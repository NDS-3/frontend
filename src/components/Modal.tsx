import React from "react";

interface IProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  element: JSX.Element;
}

const Modal = ({ setShowModal, element }: IProps) => {
  const blockEvent = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return (
    <div
      className="absolute w-screen h-screen bg-black/70"
      onClick={() => setShowModal(false)}
    >
      <span onClick={(e) => blockEvent(e)}>{element}</span>
    </div>
  );
};

export default Modal;
