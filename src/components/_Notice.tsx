import { useSetRecoilState } from "recoil";
import { showStickerModalState } from "../recoil/modal";

const _Notice = () => {
  const notices: string[] = [
    "아래 『캐릭터 선택』을 클릭해 캐릭터를 선택해주세요. 이 롤링페이퍼에 이미 존재하는 캐릭터는 선택할 수 없습니다.",
    "롤링페이퍼 주인에게 하고 싶은 말을 작성해주세요.",
    "글 작성 완료 후 패스워드를 입력해주세요. 패스워드를 잊어버리시면 열람 및 수정, 삭제가 불가능합니다.",
    "본인이 작성한 롤링페이퍼는 본인의 호박에서 확인 할 수 있습니다.",
  ];

  const setShowStickersModal = useSetRecoilState(showStickerModalState);

  return (
    <div className="flex flex-col p-20 justify-between absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full text-white text-xl">
      <p className="text-4xl">안내문</p>
      {notices.map((v, i) => (
        <div key={i} className="flex">
          <p>{i + 1}.</p>
          <p className="ml-2 text-start">{v}</p>
        </div>
      ))}
      <div className="mb-[20px] mr-[20px]">
        <button
          className="py-2 px-5 rounded-lg shadow-md bg-orange-300"
          onClick={() => setShowStickersModal(true)}
        >
          캐릭터 선택
        </button>
      </div>
    </div>
  );
};
export default _Notice;
