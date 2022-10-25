import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { AllLetterType } from "../type";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { letterState, viewLetterListState } from "../recoil/letter";
import { showModalState, showStickerModalState } from "../recoil/modal";
import { ownerState } from "../recoil/user";

import { useQuery } from "react-query";
import { getLetterList } from "../api/letter";
import { getUserInfo } from "../api/user";

import Characters from "../components/Characters";
import Password from "../components/Password";
import Modal from "../components/Modal";
import _Notice from "../components/_Notice";
import Letter from "../components/Letter";
import _Content from "../components/_Content";
import _Write from "../components/_Write";
import PageController from "../components/PageController";
import ChangeName from "../components/ChangeName";

import { PatchUserNameType } from "../type";
import { Auth } from "aws-amplify";

const AllRollingPapers = () => {
  const { personalPath } = useParams();

  const [myLink, setMyLink] = useState("");
  const [pumpkinPage, setPumpkinPage] = useState(0);
  const [createOrUpdate, setCreateOrUpdate] = useState("create");

  const [userInfo, setUserInfo] = useRecoilState(ownerState);
  const [pumpkinList, setPumpkinList] = useRecoilState(viewLetterListState);
  const [letter, setLetter] = useRecoilState(letterState);
  const [showModal] = useRecoilState(showModalState); // 닫기, 안내, 쓰기, 비번, 읽기, 수정
  const [showStickersModal] = useRecoilState(showStickerModalState);

  const setShowModal = useSetRecoilState(showModalState);
  const resetLetter = useResetRecoilState(letterState);

  useEffect(() => {
    setMyLink("http://localhost:3000/" + personalPath);
    // setPumpkinList(dummyPumpkinList);
  }, []);

  useQuery<PatchUserNameType, Error>(
    "getUserInfo",
    () => getUserInfo(personalPath || ""),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: false,
      onSuccess: (data) => {
        console.log("🎁 Success getUserInfo:", data);
        setUserInfo({ ...data, personalUrl: personalPath || "" });
      },
    }
  );

  useQuery<AllLetterType[], Error>(
    ["getLetterList", pumpkinPage],
    () => getLetterList(userInfo.id, pumpkinPage),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: false,
      onSuccess: (data) => {
        console.log("🎁 Success getLetterListData:", data);
        setPumpkinList(data);
      },
      onError: (err) => {
        console.log("🎃 Error getLetterList:", err);
      },
    }
  );

  const copyLink = () => {
    window.navigator.clipboard.writeText(myLink);
  };

  const clickPumpkin = (flag: boolean, id: number) => {
    setCreateOrUpdate(flag ? "update" : "create");
    if (flag) {
      setLetter({ ...letter, id: id });
      setShowModal("비번");
    } else {
      resetLetter();
      setShowModal("안내");
    }
  };

  const ModalCase = () => {
    switch (showModal) {
      case "비번":
        return <Password />;
      case "읽기":
        return <Letter element={<_Content />} />;
      case "안내":
        return <Letter element={<_Notice />} />;
      case "쓰기":
        return <Letter element={<_Write createOrUpdate={createOrUpdate} />} />;
      case "수정":
        return <Letter element={<_Write createOrUpdate={createOrUpdate} />} />;
      case "이름":
        return <ChangeName />;
      default:
        return null;
    }
  };

  const changeName = () => {
    if (userInfo.id > 0) {
      setShowModal("이름");
    }
  };

  return (
    <div className="h-screen w-screen relative flex flex-col justify-evenly text-center">
      <img
        src={`${process.env.PUBLIC_URL}/img/background02.png`}
        alt="bg"
        className="absolute left-0 top-0 -z-50 h-full w-full"
      />
      <PageController
        setCurrentPage={setPumpkinPage}
        currentPage={pumpkinPage}
      />
      <div className="text-yellow-500 font-bold text-4xl mt-10">
        <div className="pb-4">
          <span onClick={() => changeName()}>{userInfo.username}</span>
          <span>님의 롤링페이퍼입니다.</span>
        </div>
        <p>빈 호박을 클릭해 롤링페이퍼 주인에게 하고 싶은 말을 작성해주세요.</p>
      </div>
      <div className="w-4/5 mx-auto grid grid-cols-5">
        {pumpkinList.map((v, idx) => {
          const flag = Object.keys(v).length > 0;
          const imageName = flag ? "full" : "empty";
          return (
            <div key={idx} className="w-1/2 m-1 relative h-1/1 aspect-square">
              <img
                src={`${process.env.PUBLIC_URL}/img/${imageName}.png`}
                alt={imageName}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/1 aspect-square cursor-pointer"
                onClick={() => clickPumpkin(flag, v.id)}
              />
              {flag && (
                <img
                  className="absolute left-1/2 top-2/3 pb-2 -translate-x-1/2 -translate-y-1/2 w-3/5 cursor-pointer hover:scale-110 transition-all"
                  src={v.sticker.imageUrl}
                  alt="character"
                  onClick={() => clickPumpkin(flag, v.id)}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-5">
        <p className="text-white text-2xl">링크를 공유하세요</p>
        <button
          className="py-3 px-6 rounded-lg shadow-md bg-neutral-400 font-semibold"
          onClick={() => copyLink()}
        >
          {myLink}
        </button>
      </div>
      {showModal !== "닫기" && <Modal element={<ModalCase />} />}
      {showStickersModal && <Characters createOrUpdate={createOrUpdate} />}
      <button onClick={() => Auth.signOut()}>여기!</button>
    </div>
  );
};

export default AllRollingPapers;
