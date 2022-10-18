import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LetterContent from "../components/LetterContent";
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
    password: string;
  };
}

const AllRollingPapers = () => {
  const [userName, setUserName] = useState("일이삼");
  const [pumpkinList, setpumpkinList] = useState<Istate["pumpkinList"][]>([]);
  const [pumpkinContent, setPumpkinContent] = useState<Istate["pumpkin"]>();
  const { personalPath } = useParams();
  const [myLink, setMyLink] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setUserName(personalPath || "user");
    setpumpkinList(dummyPumpkinList);
    setMyLink("http://localhost:3000/" + personalPath);
  }, []);

  const copyLink = () => {
    window.navigator.clipboard.writeText(myLink);
  };

  const showLetter = (i: number) => {
    setShowModal(true);
    console.log(i + "로 알맞는 롤링페이퍼 내용 가져오기");
    // pumpkinId를 담아서 편지 content 받아오도록 요청
    setPumpkinContent(dummyPumpkin);
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
            <img
              src={`${process.env.PUBLIC_URL}/img/pumpkin01.png`}
              alt="empty"
              className="mx-auto"
              onClick={() => showLetter(i)}
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-20">
        <p className="text-white text-2xl mb-5">링크를 공유하세요</p>
        <button
          className="py-3 px-6 rounded-lg shadow-md bg-neutral-400 font-semibold"
          onClick={() => copyLink()}
        >
          {myLink}
        </button>
      </div>
      {showModal && <LetterContent setShowModal={setShowModal} />}
    </div>
  );
};

export default AllRollingPapers;
