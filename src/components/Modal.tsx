import { useSetRecoilState } from "recoil";
import { showModalState, showStickerModalState } from "../recoil/modal";

interface IProps {
  element: JSX.Element;
}

const Modal = ({ element }: IProps) => {
  const setShowModal = useSetRecoilState(showModalState);
  const setShowStickersModal = useSetRecoilState(showStickerModalState);

  const blockEvent = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return (
    <div
      className="absolute w-screen h-screen bg-black/70"
      onClick={() => {
        setShowModal("닫기");
        setShowStickersModal(false);
      }}
    >
      <span onClick={(e) => blockEvent(e)}>{element}</span>
    </div>
  );
};

export default Modal;
