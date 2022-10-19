import React from "react";

interface IProps {
  letter?: {
    id: number;
    imageUrl: string;
    content: string;
  };
}

const LetterContent = ({ letter }: IProps) => {
  const deleteLetter = () => {
    console.log("이 편지를 지우자");
  };
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2">
      <img
        className="relative"
        src={`${process.env.PUBLIC_URL}/img/letter.jpg`}
        alt="bg"
      />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {letter?.content}
      </div>
      <div className="absolute right-5 bottom-5">
        <button className="py-1 px-3 mr-5 rounded-lg shadow-md bg-orange-300">
          수정
        </button>
        <button
          className="py-1 px-3 rounded-lg shadow-md bg-orange-300"
          onClick={() => deleteLetter()}
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default LetterContent;
