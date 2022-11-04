import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { letterState } from "../recoil/letter";
import { EachLetterType } from "../type";
import { showModalState, showStickerModalState } from "../recoil/modal";
import { useMutation, useQueryClient } from "react-query";
import { postLetter, patchLetter } from "../api/letter";
import { ownerState, isCheckState } from "../recoil/user";
interface IProps {
  createOrUpdate: string;
}

const _Write = ({ createOrUpdate }: IProps) => {
  const queryClient = useQueryClient();

  const [inputPassword, setInputPassword] = useState("");
  const [newLetter, setNewLetter] = useState<EachLetterType>({
    id: -1,
    sticker: {
      id: -1,
      imageUrl: "",
    },
    content: "",
  });

  const userInfo = useRecoilValue(ownerState);
  const isCheck = useRecoilValue(isCheckState);
  const setShowModal = useSetRecoilState(showModalState);
  const setShowStickerModal = useSetRecoilState(showStickerModalState);

  const [letter, setLetter] = useRecoilState(letterState);

  useEffect(() => {
    setNewLetter(letter);
  }, []);

  const clickButton = () => {
    if (isCheck.isPassed) return alert("편지를 쓸 수 있는 날짜가 지났습니다.");

    const contentLen = newLetter.content.trim().length;
    if (contentLen < 20 || contentLen > 200)
      return alert(
        `공백을 포함하여 20자 이상, 200자 이내로 입력하세요\n${contentLen}자 입력했습니다`
      );

    if (createOrUpdate === "create") {
      const passwordTrim = inputPassword.trim();
      const len = passwordTrim.length;
      const regex = /^[a-zA-Z0-9가-힣]*$/;
      if (len < 4 || len > 8 || !regex.test(passwordTrim))
        return alert("비밀번호는 4자 ~ 8자의 한글과 영어로 입력하세요");
      else return createLetter();
    }

    return updateLetter();
  };

  const { mutate: postLetterMutation } = useMutation(postLetter, {
    onSuccess: (data) => {
      setLetter(data);
      queryClient.invalidateQueries(["getLetterList"]);
      console.log("🎁 Success postLetter:", data);
    },
    onError: (err) => {
      console.log("🤷‍♀️ Error postLetter:", err);
    },
  });

  const { mutate: patchLetterMutation } = useMutation(patchLetter, {
    onSuccess: (data) => {
      setLetter(data);
      queryClient.invalidateQueries(["getLetterList"]);
      console.log("🎁 Success patchLetter:", data);
    },
    onError: (err) => {
      console.log("🤷‍♀️ Error patchLetter:", err);
    },
  });

  const createLetter = () => {
    const data = {
      id: userInfo.id,
      password: inputPassword,
      stickerId: newLetter.sticker.id,
      content: newLetter.content,
    };
    postLetterMutation(data);
    setShowModal("읽기");
  };

  const updateLetter = () => {
    const data = {
      letterId: letter.id,
      stickerId: newLetter.sticker.id,
      content: newLetter.content,
    };
    patchLetterMutation(data);
    setShowModal("읽기");
  };

  const changeSticker = () => {
    setLetter({ ...letter, content: newLetter.content });
    setShowStickerModal(true);
  };

  return (
    <div className="flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full py-3">
      <div className="w-1/5 px-1">
        <img
          className="aspect-square cursor-pointer"
          src={newLetter.sticker.imageUrl}
          alt="sticker"
          title="스티커 변경"
          onClick={() => changeSticker()}
        />
      </div>
      <div className="w-3/5 flex flex-col items-end">
        {createOrUpdate === "create" && (
          <input
            className="p-2 w-3/5 focus:outline-none"
            value={inputPassword}
            type="password"
            autoFocus={createOrUpdate === "create"}
            onChange={(e) => setInputPassword(e.target.value)}
            placeholder="password"
          />
        )}
        <textarea
          className="mt-2 p-2 w-full h-full focus:outline-none"
          value={newLetter.content}
          placeholder="편지를 작성하세요"
          autoFocus={createOrUpdate === "update"}
          onChange={(e) =>
            setNewLetter({ ...newLetter, content: e.target.value })
          }
        />
      </div>
      <div className="w-1/5 relative">
        <button
          className="absolute bottom-0 right-1 py-1 px-3 rounded-lg shadow-md bg-my-button hover:bg-my-button-hover hover:text-white"
          onClick={() => clickButton()}
        >
          {createOrUpdate === "create" ? "편지 보내기" : "편지 고치기"}
        </button>
      </div>
    </div>
  );
};

export default _Write;
