import React from "react";

interface IProps {
  setShowLetterModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const LetterContent = ({ setShowLetterModal }: IProps) => {
  return (
    <div className="absolute w-1/2 left-1/4">
      <img src={`${process.env.PUBLIC_URL}/img/letter.jpg`} alt="bg" />
    </div>
  );
};

export default LetterContent;
