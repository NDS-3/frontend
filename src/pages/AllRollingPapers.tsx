import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "../components/Modal";
import _Content from "../components/_Content";
import Password from "../components/Password";
import _Notice from "../components/_Notice";
import _Write from "../components/_Write";
import Letter from "../components/Letter";
import { dummyPumpkin, dummyPumpkinList } from "../dummy.js";

interface Istate {
  pumpkinList: {
    pumpkinId: number;
    imageUrl: string;
  };
  pumpkin: {
    id: number;
    imageUrl: string;
    content: string;
  };
}

const AllRollingPapers = () => {
  const [userName, setUserName] = useState("일이삼");
  const [pumpkinList, setpumpkinList] = useState<Istate["pumpkinList"][]>([]);
  const [pumpkinContent, setPumpkinContent] = useState<Istate["pumpkin"]>();
  const { personalPath } = useParams();
  const [myLink, setMyLink] = useState("");
  // 닫기, 안내, 쓰기, 비번, 읽기
  const [showModal, setShowModal] = useState("닫기");

  useEffect(() => {
    setUserName(personalPath || "user");
    setpumpkinList(dummyPumpkinList);
    setMyLink("http://localhost:3000/" + personalPath);
  }, []);

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
              <_Write
                createOrUpdate="create"
                setShowModal={setShowModal}
                setLetter={setPumpkinContent}
              />
            }
          />
        );
      case "수정":
        return (
          <Letter
            element={
              <_Write
                createOrUpdate="update"
                setShowModal={setShowModal}
                letter={pumpkinContent}
                setLetter={setPumpkinContent}
              />
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-screen w-screen relative flex flex-col justify-center text-center">
      <img
        src={`${process.env.PUBLIC_URL}/img/background02.png`}
        alt="bg"
        className="absolute left-0 top-0 -z-50 h-full w-full"
      />
      <div className="text-yellow-500 font-bold text-4xl mt-10">
        <p className="pb-4">{userName}님의 롤링페이퍼입니다.</p>
        <p>빈 호박을 클릭해 롤링페이퍼 주인에게 하고 싶은 말을 작성해주세요.</p>
      </div>
      <div className="flex flex-wrap w-4/5 mx-auto justify-center">
        {pumpkinList.map((v, i) => (
          <div key={i} className="basis-1/5 p-10">
            {v.imageUrl.length > 0 ? (
              <img
                src={`${process.env.PUBLIC_URL}/img/full.png`}
                alt="full"
                className="mx-auto"
                onClick={() => showLetter(i)}
              />
            ) : (
              <img
                src={`${process.env.PUBLIC_URL}/img/empty.png`}
                alt="empty"
                className="mx-auto"
                onClick={() => writeLetter(i)}
              />
            )}
          </div>
        ))}
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
      {showModal !== "닫기" && ModalCase && (
        <Modal setShowModal={setShowModal} element={<ModalCase />} />
      )}
    </div>
  );
};

export default AllRollingPapers;
