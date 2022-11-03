import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { AllLetterType, getUSerInfoType } from "../type";
import { useRecoilState, useSetRecoilState } from "recoil";
import { letterState, viewLetterListState } from "../recoil/letter";
import { showModalState, showStickerModalState } from "../recoil/modal";
import { googleJWTState, ownerState, isCheckState } from "../recoil/user";

import { useQuery } from "react-query";
import { getLetterList } from "../api/letter";
import { getCheckPassedDate, getUrl, getUserInfo } from "../api/user";

import Characters from "../components/Characters";
import Password from "../components/Password";
import Modal from "../components/Modal";
import _Notice from "../components/_Notice";
import Letter from "../components/Letter";
import _Content from "../components/_Content";
import _myContent from "../components/_myContent";
import _Write from "../components/_Write";
import PageController from "../components/PageController";
import ChangeName from "../components/ChangeName";

interface IProps {
  setGetUrlFlag: React.Dispatch<React.SetStateAction<boolean>>;
}

const AllRollingPapers = ({ setGetUrlFlag }: IProps) => {
  const { personalPath } = useParams();
  const navigate = useNavigate();

  const [letterPage, setLetterPage] = useState(0);
  const [createOrUpdate, setCreateOrUpdate] = useState("create");

  const [userInfo, setUserInfo] = useRecoilState(ownerState);
  const [letterList, setLetterList] = useRecoilState(viewLetterListState);
  const [letter, setLetter] = useRecoilState(letterState);
  const [showModal] = useRecoilState(showModalState); // 닫기, 비번, 읽기, 안내, 쓰기, 수정, 이름
  const [showStickersModal] = useRecoilState(showStickerModalState);
  const [jwt, setJwt] = useRecoilState(googleJWTState);
  const [isCheck, setIsCheck] = useRecoilState(isCheckState);

  const setShowModal = useSetRecoilState(showModalState);

  useQuery<getUSerInfoType>(
    ["getUserInfo", personalPath],
    () => getUserInfo(personalPath || ""),
    {
      onSuccess: (data) => {
        console.log("🎁 Success getUserInfo:", data);
        setUserInfo({ ...data, personalUrl: personalPath || "" });
      },
      enabled: !!personalPath,
    }
  );

  useQuery<string>(["checkEncryption", personalPath], () => getUrl(jwt), {
    onSuccess: (personalUrl) => {
      setIsCheck({ ...isCheck, isOwner: personalPath === personalUrl });
    },
    enabled: !!personalPath,
  });

  useQuery<boolean>(
    ["checkPassedDate", personalPath],
    () => getCheckPassedDate(),
    {
      onSuccess: (isPassed) => {
        console.log("isPassed?:", isPassed);
        setIsCheck({ ...isCheck, isPassed });
      },
      enabled: !!personalPath,
    }
  );

  useQuery<AllLetterType[]>(
    ["getLetterList", letterPage, userInfo.id],
    () => getLetterList(userInfo.id, letterPage),
    {
      onSuccess: (data) => {
        // console.log("🎁 Success getLetterListData:", data);
        setLetterList(data);
      },
      onError: (err) => {
        console.log("🎃 Error getLetterList:", err);
      },
      enabled: userInfo.id > 0,
    }
  );

  const copyLink = () => {
    const text = window.location.href;
    window.navigator.clipboard.writeText(text);
  };

  const clickPumpkin = (flag: boolean, id: number) => {
    setCreateOrUpdate(flag ? "update" : "create");
    setLetter({ ...letter, id: id });
    if (isCheck.isPassed) {
      if (!flag) return alert("편지를 쓸 수 있는 날짜가 지났습니다.");
      if (isCheck.isOwner) return setShowModal("주인");
      return alert("날짜가 지나서 주인만 볼 수 있습니다.");
    } else {
      if (flag) return setShowModal("비번");
      return setShowModal("안내");
    }
  };

  const changeName = () => {
    if (isCheck.isOwner) setShowModal("이름");
  };

  const ModalCase = () => {
    switch (showModal) {
      case "비번":
        return <Password />;
      case "읽기":
        return <Letter element={<_Content />} />;
      case "주인":
        return <Letter element={<_myContent />} />;
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

  const ButtonForUser = () => {
    const divStyle = "fixed top-5 right-0";
    const buttonStyle =
      "mr-5 py-1 px-3 rounded-lg shadow-md bg-orange-300 border border-solid border-black cursor-pointer hover:scale-105 transition-all";

    if (!!jwt) {
      const clickLogout = () => {
        setJwt("");
        localStorage.clear();
      };

      const clickMypage = () => {
        setGetUrlFlag(true);
      };

      return (
        <div className={divStyle}>
          <button onClick={() => clickLogout()} className={buttonStyle}>
            logout
          </button>
          <button onClick={() => clickMypage()} className={buttonStyle}>
            my rollingpaper
          </button>
        </div>
      );
    } else {
      const clickLogin = () => {
        navigate("/");
      };
      return (
        <div className={divStyle}>
          <button onClick={() => clickLogin()} className={buttonStyle}>
            login
          </button>
        </div>
      );
    }
  };

  return (
    <div className="h-screen w-screen relative flex flex-col justify-evenly text-center">
      <img
        src={`${process.env.PUBLIC_URL}/img/background.png`}
        alt="bg"
        className="absolute left-0 top-0 -z-50 h-full w-full"
      />
      <PageController setCurrentPage={setLetterPage} currentPage={letterPage} />
      <ButtonForUser />
      <div className="text-yellow-500 font-bold text-4xl mt-10">
        <div className="pb-4">
          <span onClick={() => changeName()}>{userInfo.username}</span>
          <span>님의 롤링페이퍼입니다.</span>
        </div>
        <p>빈 호박을 클릭해 롤링페이퍼 주인에게 하고 싶은 말을 작성해주세요.</p>
      </div>
      <div className="dddddd w-4/5 mx-auto grid grid-cols-5">
        {letterList.map((letter, idx) => {
          const flag = letter.id > 0;
          // const imageName = flag ? "full" : "empty";
          const imageName = flag ? "after" : "before";
          return (
            <div key={idx} className="m-1 relative">
              <img
                className="w-3/5 aspect-square cursor-pointer mx-auto"
                src={`${process.env.PUBLIC_URL}/img/${imageName}.png`}
                alt={imageName}
                onClick={() => clickPumpkin(flag, letter.id)}
                title={flag ? "" : "편지를 써주세요"}
              />
              {flag && (
                <img
                  className="absolute left-1/2 top-1/2 pb-5 -translate-x-1/2 -translate-y-1/3 w-1/2 cursor-pointer hover:scale-110 transition-all"
                  src={letter.sticker.imageUrl}
                  alt="character"
                  onClick={() => clickPumpkin(flag, letter.id)}
                />
              )}
            </div>
          );
        })}
      </div>
      <div>
        <p className="text-white text-xl">링크를 공유하세요</p>
        <button
          className="py-3 px-6 rounded-lg shadow-md bg-neutral-400 font-semibold hover:font-bold"
          onClick={() => copyLink()}
        >
          {window.location.href}
        </button>
      </div>
      {showModal !== "닫기" && <Modal element={<ModalCase />} />}
      {showStickersModal && <Characters createOrUpdate={createOrUpdate} />}
    </div>
  );
};

export default AllRollingPapers;
