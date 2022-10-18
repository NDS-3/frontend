import React, { useEffect, useState } from "react";
import "../style/AllRollingPapers.css";

const AllRollingPapers = () => {
  // interface Istate {
  //   rollingpaper: {
  //     idx: number;
  //     url: string;
  //   };
  // }
  const [userName, setUserName] = useState("일이삼");
  // const [rollingPapers, setRollingPapers] = useState<Istate["rollingpaper"]>({
  //   idx: 0,
  //   url: "",
  // });
  useEffect(() => {
    setUserName("사오육");
  }, []);
  return (
    <div className="allrollingpapers">
      <div>
        <p>{userName}님의 롤링페이퍼입니다.</p>
        <p>빈 호박을 클릭해 롤링페이퍼 주인에게 하고 싶은 말을 작성해주세요.</p>
      </div>
      <div>
        {[...Array(10)].map((i, v) => (
          <img
            key={i}
            src={`${process.env.PUBLIC_URL}/img/pumpkin01.png`}
            alt="empty"
          />
        ))}
      </div>
      <div>
        <p>링크를 공유하세요</p>
        <button>https://~~</button>
      </div>
    </div>
  );
};

export default AllRollingPapers;
