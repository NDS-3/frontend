import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useParams } from "react-router-dom";
import Modal from "../components/Modal";
import _Content from "../components/_Content";
import Password from "../components/Password";
import _Notice from "../components/_Notice";
import _Write from "../components/_Write";
import Letter from "../components/Letter";
import PageController from "../components/PageController";
import { dummyPumpkin, dummyPumpkinList } from "../dummy.js";
import Characters from "../components/Characters";
import { letterState, viewLetterListState } from "../recoil/posts";
import { userState } from "../recoil/user";
import { getLetterList } from "../api/letter";

const AllRollingPapers = () => {
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [pumpkinList, setPumpkinList] = useRecoilState(viewLetterListState);
  const [pumpkinContent, setPumpkinContent] = useRecoilState(letterState);
  const { personalPath } = useParams();
  const [myLink, setMyLink] = useState("");
  // 닫기, 안내, 쓰기, 비번, 읽기, 수정
  const [showModal, setShowModal] = useState("닫기");
  const [pumpkinPage, setPumpkinPage] = useState(0);

  useEffect(() => {
    setUserInfo({ ...userInfo, url: personalPath || "" });
    setPumpkinList(dummyPumpkinList);
    setMyLink("http://localhost:3000/" + personalPath);
  }, []);

  useEffect(() => {
    setPumpkinList(dummyPumpkinList);
  }, [pumpkinPage]);

  const copyLink = () => {
    window.navigator.clipboard.writeText(myLink);
  };

  const showLetter = (i: number) => {
    setShowModal("비번");
    console.log(i + "로 알맞는 롤링페이퍼 내용 가져오기");
    setPumpkinContent(dummyPumpkin);
  };

  const writeLetter = (i: number) => {
    console.log(i + "번째 편지쓸래");
    setShowModal("안내");
  };

  const clickPumpkin = (flag: boolean, i: number) => {
    if (flag) return showLetter(i);
    return writeLetter(i);
  };

  const ModalCase = () => {
    switch (showModal) {
      case "비번":
        return <Password setShowModal={setShowModal} />;
      case "읽기":
        return (
          <Letter
            element={
              <_Content setShowModal={setShowModal} letter={pumpkinContent} />
            }
          />
        );
      case "안내":
        return <Letter element={<_Notice setShowModal={setShowModal} />} />;
      case "쓰기":
        return (
          <Letter
            element={
              <_Write createOrUpdate="create" setShowModal={setShowModal} />
            }
          />
        );
      case "수정":
        return (
          <Letter
            element={
              <_Write createOrUpdate="update" setShowModal={setShowModal} />
            }
          />
        );
      case "쓰기선택" || "수정선택":
        return <Characters setShowModal={setShowModal} />;
      default:
        return null;
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
        <p className="pb-4">{userInfo.userName}님의 롤링페이퍼입니다.</p>
        <p>빈 호박을 클릭해 롤링페이퍼 주인에게 하고 싶은 말을 작성해주세요.</p>
      </div>
      <div className="w-4/5 mx-auto grid grid-cols-5">
        {pumpkinList.map((v) => {
          const flag = v.stickerUrl.length > 0;
          const imageName = flag ? "full" : "empty";
          return (
            <div
              key={v.letterId}
              className="w-1/2 m-1 relative h-1/1 aspect-square"
            >
              <img
                src={`${process.env.PUBLIC_URL}/img/${imageName}.png`}
                alt={imageName}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/1 aspect-square"
                onClick={() => clickPumpkin(flag, v.letterId)}
              />
              {flag && (
                <img
                  className="absolute left-1/2 top-2/3 pb-2 -translate-x-1/2 -translate-y-1/2 w-3/5"
                  src={v.stickerUrl}
                  alt="character"
                  onClick={() => clickPumpkin(flag, v.letterId)}
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
      {showModal !== "닫기" && (
        <Modal setShowModal={setShowModal} element={<ModalCase />} />
      )}
    </div>
  );
};

export default AllRollingPapers;
