import React from "react";

interface IProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const LetterContent: React.FC<IProps> = ({ setShowModal }) => {
  return (
    <div
      className="absolute w-screen h-screen bg-white/70"
      onClick={() => setShowModal(false)}
    >
      <div className="absolute w-1/2 left-1/4">
        <img src={`${process.env.PUBLIC_URL}/img/letter.jpg`} alt="bg" />
      </div>
    </div>
  );
};

export default LetterContent;
