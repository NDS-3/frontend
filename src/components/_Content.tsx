import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { showModalState } from "../recoil/modal";
import { letterState } from "../recoil/letter";
import { deleteLetter } from "../api/letter";
import { useQueryClient } from "react-query";
import { googleJWTState } from "../recoil/user";

const _Content = () => {
  const queryClient = useQueryClient();

  const setShowModal = useSetRecoilState(showModalState);
  const [letter] = useRecoilState(letterState);
  const [jwt] = useRecoilState(googleJWTState);
  const resetLetter = useResetRecoilState(letterState);

  const clickDelete = () => {
    const answer = window.confirm("이 편지를 지우실 건가요?");
    if (answer) {
      deleteLetter(letter.id).then(() => {
        queryClient.invalidateQueries(["getLetterList"]);
        resetLetter();
      });
      setShowModal("닫기");
    }
  };

  const chnageToUpdateModal = () => {
    setShowModal("수정");
  };

  const letterCapture = () => {
    alert("아직 안만들었어요");
  };

  const ButtonByJwt = () => {
    const divStyle = "mr-1 flex justify-end";
    const buttonStyle = "py-1 px-3 mr-5 rounded-lg shadow-md bg-orange-300";
    if (jwt.length > 0) {
      return (
        <div className={divStyle}>
          <button className={buttonStyle} onClick={() => letterCapture()}>
            편지 캡처
          </button>
        </div>
      );
    } else {
      return (
        <div className={divStyle}>
          <button className={buttonStyle} onClick={() => chnageToUpdateModal()}>
            수정
          </button>
          <button className={buttonStyle} onClick={() => clickDelete()}>
            삭제
          </button>
        </div>
      );
    }
  };

  return (
    <div className="w-full h-full text-white text-xl py-3 flex flex-col justify-between absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="h-1/5">
        <img
          className="h-full aspect-square"
          src={letter.sticker.imageUrl}
          alt="character"
        />
      </div>
      <div className="text-white h-2/3 px-10 break-all whitespace-pre-line overflow-y-auto">
        {letter?.content}
      </div>
      <ButtonByJwt />
    </div>
  );
};

export default _Content;
