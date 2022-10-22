import React from "react";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { showModalState } from "../recoil/modal";
import { letterState } from "../recoil/posts";

const _Content = () => {
  const setShowModal = useSetRecoilState(showModalState);
  const [letter] = useRecoilState(letterState);
  const resetLetter = useResetRecoilState(letterState);

  const deleteLetter = () => {
    const answer = window.confirm("삭제?");
    if (answer) {
      console.log("DELETE id:", letter.letterId);
      setShowModal("닫기");
      resetLetter();
    }
  };

  const chnageToUpdateModal = () => {
    setShowModal("수정");
  };

  return (
    <div className="flex flex-col justify-between absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full text-white text-xl">
      <img
        src={letter.stickerUrl}
        alt="character"
        className="w-1/5 aspect-square"
      />
      <div className="text-white px-20 mb-20 whitespace-pre-line">
        {letter?.content}
      </div>
      <div className="mb-[20px] mr-[20px] flex justify-end">
        <button
          className="py-1 px-3 mr-5 rounded-lg shadow-md bg-orange-300"
          onClick={() => chnageToUpdateModal()}
        >
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

export default _Content;
