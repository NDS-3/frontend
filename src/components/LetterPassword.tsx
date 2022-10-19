import React, { useState } from "react";

interface IProps {
  setShowPwModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLetterModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const LetterPassword = ({ setShowPwModal, setShowLetterModal }: IProps) => {
  const [password, setPassword] = useState("");
  const checkPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(password + " 맞는지 확인");
    setPassword("");
    setShowPwModal(false);
    setShowLetterModal(true);
  };

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-20 py-5 bg-neutral-400 rounded-lg">
      <form onSubmit={(e) => checkPassword(e)}>
        <label className="block" htmlFor="pw">
          <p className="mb-1">비밀번호를 입력하세요</p>
          <input
            type="password"
            className="w-1/1"
            value={password}
            id="pw"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button className="py-1 px-3 mt-2 rounded-lg shadow-md bg-orange-300">
          롤링페이퍼 보러가기
        </button>
      </form>
    </div>
  );
};

export default LetterPassword;
