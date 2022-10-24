import React, { useState, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { letterState } from "../recoil/letters";
import { EachLetterType } from "../type";
import { showModalState, showStickerModalState } from "../recoil/modal";
import { useMutation, useQueryClient } from "react-query";
import { postLetter, patchLetter } from "../api/letter";
import { ownerState } from "../recoil/user";
interface IProps {
  createOrUpdate: string;
}

const _Write = ({ createOrUpdate }: IProps) => {
  const queryClient = useQueryClient();
  const [inputPassword, setInputPassword] = useState("");
  const [userInfo] = useRecoilState(ownerState);

  const setShowModal = useSetRecoilState(showModalState);
  const setShowStickerModal = useSetRecoilState(showStickerModalState);

  const [letter, setLetter] = useRecoilState(letterState);
  const [newLetter, setNewLetter] = useState<EachLetterType>({
    letterId: -1,
    sticker: {
      id: -1,
      image_url: "",
    },
    content: "",
  });

  useEffect(() => {
    setNewLetter(letter);
  }, []);

  const clickButton = () => {
    if (createOrUpdate === "create") {
      if (!!!inputPassword.trim()) alert("비밀번호를 입력하세요");
      else if (!!!newLetter.content.trim()) alert("편지내용을 작성하세요");
      else createLetter();
    } else {
      if (!!!newLetter.content.trim()) alert("편지내용을 입력하세요");
      else updateLetter();
    }
  };

  const { mutate: postLetterMutation } = useMutation(postLetter, {
    onSuccess: () => {
      queryClient.invalidateQueries(["getLetterList"]);
      console.log("🎁 Success postLetter");
    },
    onError: (err) => {
      console.log("🎃 Error postLetter:", err);
    },
  });

  const { mutate: patchLetterMutation } = useMutation(patchLetter, {
    onSuccess: () => {
      queryClient.invalidateQueries(["getLetterList"]);
      console.log("🎁 Success patchLetter");
    },
    onError: (err) => {
      console.log("🎃 Error patchLetter:", err);
    },
  });

  const createLetter = () => {
    const data = {
      id: userInfo.id,
      password: inputPassword,
      stickerId: newLetter.sticker.id,
      content: newLetter.content,
    };
    postLetterMutation(data, {
      onSuccess: (data) => {
        setLetter(data);
        console.log("🎁 Success postLetterMutation:", data);
      },
    });
    setShowModal("닫기");
  };

  const updateLetter = () => {
    const data = {
      letterId: letter.letterId,
      stickerId: newLetter.sticker.id,
      content: newLetter.content,
    };
    patchLetterMutation(data, {
      onSuccess: (data) => {
        setLetter({ ...newLetter, letterId: letter.letterId });
        console.log("🎁 Success patchLetterMutation:", data);
      },
      onError: (err) => {
        console.log("🎃 Error patchLetterMutation:", err);
      },
    });
    setShowModal("읽기");
  };

  const changeSticker = () => {
    setLetter({ ...letter, content: newLetter.content });
    setShowStickerModal(true);
  };

  return (
    <div className="flex flex-col justify-between absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full text-xl">
      <img
        src={
          newLetter.sticker.image_url ||
          "https://cdn.wadiz.kr/ft/images/green001/2021/1220/20211220134242960_16.jpg/wadiz/format/jpg/quality/80/optimize"
        }
        alt="sticker"
        className="w-1/5 aspect-square cursor-pointer"
        title="스티커 변경"
        onClick={() => changeSticker()}
      />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 flex flex-col items-end">
        {createOrUpdate === "create" && (
          <input
            className="p-2 mb-5 w-3/5 focus:outline-none focus:border-sky-500 focus:ring-sky-500"
            value={inputPassword}
            type="password"
            autoFocus={createOrUpdate === "create"}
            onChange={(e) => setInputPassword(e.target.value)}
            placeholder="password"
          />
        )}
        <textarea
          className="p-2 w-full h-[500px] focus:outline-none focus:border-sky-500 focus:ring-sky-500"
          value={newLetter.content}
          placeholder="편지를 작성하세요"
          autoFocus={createOrUpdate === "update"}
          onChange={(e) =>
            setNewLetter({ ...newLetter, content: e.target.value })
          }
        />
      </div>
      <div className="mb-[20px] mr-[20px] text-end">
        <button
          className="py-1 px-3 rounded-lg shadow-md bg-orange-300"
          onClick={() => clickButton()}
        >
          {createOrUpdate === "create" ? "편지 보내기" : "편지 고치기"}
        </button>
      </div>
    </div>
  );
};

export default _Write;
