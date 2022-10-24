import React, { useState } from "react";
import { getLetterWithPassword } from "../api/letter";
import { useRecoilState, useSetRecoilState } from "recoil";
import { ownerState } from "../recoil/user";
import { showModalState } from "../recoil/modal";
import { letterState } from "../recoil/letters";

const Password = () => {
  const [password, setPassword] = useState("");
  const [userInfo] = useRecoilState(ownerState);
  const setShowModal = useSetRecoilState(showModalState);
  const setLetter = useSetRecoilState(letterState);

  const checkPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { id: userInfo.id, letterId: 9, password };
    getLetterWithPassword(data).then((data) => {
      setLetter(data);
      setShowModal("읽기");
      // 맞으면 id, imageUrl, content 담아 보내고 => 편지 열기
    });
    // 틀리면 idx: -1, 나머지는 빈문자열 담아 보내고 => 틀림 알려주고 모달 닫아버리기
    // alert("비밀번호가 틀렸습니다")
  };

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-20 py-5 bg-neutral-400 rounded-lg">
      <form onSubmit={(e) => checkPassword(e)}>
        <label className="block" htmlFor="pw">
          <p className="mb-1">비밀번호를 입력하세요</p>
          <input
            placeholder="password"
            type="password"
            className="w-1/1 p-1"
            value={password}
            id="pw"
            autoFocus
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

export default Password;
