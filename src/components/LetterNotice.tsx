import React from "react";

interface IProps {
  setShowModal: React.Dispatch<React.SetStateAction<string>>;
}

const LetterNotice = ({ setShowModal }: IProps) => {
  const notices: string[] = [
    "아래 '사진 업로드'를 클릭해 사진을 업로드 해주세요. 닮은 연예인을 찾아드립니다.",
    "롤링페이퍼 주인에게 하고 싶은 말을 작성해주세요.",
    "글 작성 완료 후 패스워드를 입력해주세요. 패스워드를 잊어버리시면 열람 및 수정, 삭제가 불가능합니다.",
    "본인이 작성한 롤링페이퍼는 본인의 호박에서 확인 할 수 있습니다.",
  ];
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2">
      <img
        className="relative"
        src={`${process.env.PUBLIC_URL}/img/letter.jpg`}
        alt="bg"
      />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 text-white text-xl">
        <p className="absolute left-1/2 -translate-x-1/2 -top-[80px] text-4xl">
          안내문
        </p>
        {notices.map((v, i) => (
          <div key={i} className="flex mb-4">
            <p>{i + 1}.</p>
            <p className="ml-2 text-start">{v}</p>
          </div>
        ))}
      </div>
      <div className="absolute right-5 bottom-5">
        <button
          className="py-1 px-3 rounded-lg shadow-md bg-orange-300"
          onClick={() => setShowModal("쓰기")}
        >
          사진 업로드
        </button>
      </div>
    </div>
  );
};
export default LetterNotice;
