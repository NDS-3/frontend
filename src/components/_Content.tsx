import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { showModalState } from "../recoil/modal";
import { letterState } from "../recoil/letter";
import { deleteLetter } from "../api/letter";
import { useQueryClient } from "react-query";
import { isCheckState } from "../recoil/user";

const _Content = () => {
  const queryClient = useQueryClient();

  const [letter] = useRecoilState(letterState);
  const [isCheck] = useRecoilState(isCheckState);
  const setShowModal = useSetRecoilState(showModalState);
  const resetLetter = useResetRecoilState(letterState);

  const clickDelete = () => {
    if (isCheck.isPassed)
      return alert("편지를 지울 수 있는 날짜가 지났습니다.");

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
    if (isCheck.isPassed)
      return alert("편지를 수정할 수 있는 날짜가 지났습니다.");

    setShowModal("수정");
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
      <div className="mr-1 flex justify-end">
        <button
          className="py-1 px-3 mr-5 rounded-lg shadow-md bg-orange-300"
          onClick={() => chnageToUpdateModal()}
        >
          수정
        </button>
        <button
          className="py-1 px-3 mr-5 rounded-lg shadow-md bg-orange-300"
          onClick={() => clickDelete()}
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default _Content;
