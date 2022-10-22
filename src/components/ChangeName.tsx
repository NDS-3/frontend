import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { showModalState } from "../recoil/modal";
import { ownerState } from "../recoil/user";

const ChangeName = () => {
  const [newName, setNewName] = useState("");
  const [userInfo, setUSerInfo] = useRecoilState(ownerState);
  const setShowModal = useSetRecoilState(showModalState);

  const changeOwnerName = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!!newName.trim()) {
      setUSerInfo({ ...userInfo, userName: newName });
    }
    setShowModal("닫기");
  };

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-20 py-5 bg-neutral-400 rounded-lg">
      <form onSubmit={(e) => changeOwnerName(e)}>
        <label className="block" htmlFor="name">
          <p className="mb-1">새로운 이름을 입력하세요</p>
          <input
            placeholder="이름을 입력하세요"
            className="w-1/1 p-1"
            value={newName}
            autoFocus
            id="name"
            onChange={(e) => setNewName(e.target.value)}
          />
        </label>
        <button className="py-1 px-3 mt-2 rounded-lg shadow-md bg-orange-300">
          이름 변경하기
        </button>
      </form>
    </div>
  );
};

export default ChangeName;
