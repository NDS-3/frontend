import React, { useState, useEffect } from "react";
import { EachLetter } from "../recoil/posts";
import { SetterOrUpdater } from "recoil";

interface IProps {
  setShowModal: React.Dispatch<React.SetStateAction<string>>;
  setLetter: SetterOrUpdater<EachLetter>;
  letter: EachLetter;
  createOrUpdate: string;
}

interface Istate {
  newLetter: EachLetter;
}

const _Write = ({
  createOrUpdate,
  letter,
  setLetter,
  setShowModal,
}: IProps) => {
  const [inputPassword, setInputPassword] = useState("");

  const [newLetter, setNewLetter] = useState<Istate["newLetter"]>({
    letterId: -1,
    stickerUrl: "",
    content: "",
  });

  useEffect(() => {
    setNewLetter({ ...letter });
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
        src="data:image/jpeg;base64,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"
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
