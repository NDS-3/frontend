import { useResetRecoilState, useSetRecoilState } from "recoil";
import { letterState } from "../recoil/letter";
import { showModalState, showStickerModalState } from "../recoil/modal";

interface IProps {
  element: JSX.Element;
}

const Modal = ({ element }: IProps) => {
  const setShowModal = useSetRecoilState(showModalState);
  const setShowStickersModal = useSetRecoilState(showStickerModalState);
  const resetLetter = useResetRecoilState(letterState);

  const blockEvent = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
  };

  const closeModal = () => {
    setShowModal("닫기");
    setShowStickersModal(false);
    resetLetter();
  };

  return (
    <div
      className="absolute w-screen h-screen bg-black/70"
      id="my-modal"
      onClick={() => closeModal()}
    >
      <span onClick={(e) => blockEvent(e)}>{element}</span>
    </div>
  );
};

export default Modal;
