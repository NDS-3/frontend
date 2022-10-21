import React, { useState, useEffect } from "react";
import { EachLetter, letterState } from "../recoil/posts";
import { useRecoilState } from "recoil";

interface IProps {
  setShowModal: React.Dispatch<React.SetStateAction<string>>;
  createOrUpdate: string;
}

const _Write = ({ createOrUpdate, setShowModal }: IProps) => {
  const [inputPassword, setInputPassword] = useState("");

  const [letter, setLetter] = useRecoilState(letterState);
  const [newLetter, setNewLetter] = useState<EachLetter>({
    letterId: -1,
    stickerUrl: "",
    content: "",
  });

  useEffect(() => {
    setNewLetter(letter);
  }, []);

  const createLetter = () => {
    const data = {
      password: inputPassword,
      stickerUrl: newLetter.stickerUrl,
      content: newLetter.content,
    };
    // ✔return 받은 값으로 setLetter() 하고 읽기로 모달 바꿔주기
    console.log("POST data:", data);
    setShowModal("닫기");
  };

  const updateLetter = () => {
    const data = {
      letterId: letter.letterId,
      stickerUrl: newLetter.stickerUrl,
      content: newLetter.content,
    };
    setLetter(data);
    console.log("PUT data:", data);
    setShowModal("읽기");
  };

  return (
    <div className="flex flex-col justify-between absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full text-xl">
      <img
        src={
          newLetter.stickerUrl ||
          "https://cdn.wadiz.kr/ft/images/green001/2021/1220/20211220134242960_16.jpg/wadiz/format/jpg/quality/80/optimize"
        }
        alt="character"
        className="w-1/5 aspect-square"
      />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 flex flex-col items-end">
        {createOrUpdate === "create" && (
          <input
            className="p-2 mb-5 w-3/5 focus:outline-none focus:border-sky-500 focus:ring-sky-500"
            value={inputPassword}
            type="password"
            onChange={(e) => setInputPassword(e.target.value)}
          />
        )}
        <textarea
          className="p-2 w-full h-[500px] focus:outline-none focus:border-sky-500 focus:ring-sky-500"
          value={newLetter.content}
          onChange={(e) =>
            setNewLetter({ ...newLetter, content: e.target.value })
          }
        />
      </div>
      <div className="mb-[20px] mr-[20px] text-end">
        <button className="py-1 px-3 rounded-lg shadow-md bg-orange-300">
          {createOrUpdate === "create" ? (
            <span onClick={() => createLetter()}>편지 보내기</span>
          ) : (
            <span onClick={() => updateLetter()}>편지 고치기</span>
          )}
        </button>
      </div>
    </div>
  );
};

_Write.defaultProps = {
  letter: {
    id: -1,
    imageUrl: "",
    content: "",
  },
};

export default _Write;
