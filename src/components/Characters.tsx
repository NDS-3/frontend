import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { stickerListState, Sticker } from "../recoil/stickers";
import { letterState } from "../recoil/posts";
import PageController from "./PageController";
import { dummyIconList } from "../dummy";

interface IProps {
  setShowModal: React.Dispatch<React.SetStateAction<string>>;
}

interface Istate {
  icon: Sticker;
}

const Characters = ({ setShowModal }: IProps) => {
  const [page, setPage] = useState(0);
  const [originIcons, setOriginIcons] = useRecoilState(stickerListState);
  const [letter, setLetter] = useRecoilState(letterState);
  const [viewIcons, setViewIcons] = useState<Istate["icon"][]>([]);

  useEffect(() => {
    setOriginIcons(dummyIconList);
  }, []);

  useEffect(() => {
    const start = page * 10;
    setViewIcons(originIcons.slice(start, start + 10));
  }, [originIcons]);

  const clickSticker = (url: string) => {
    setLetter({ ...letter, stickerUrl: url });
    setShowModal("쓰기");
  };

  return (
    <div className="w-2/3 h-2/3 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-20 py-5 bg-white rounded-lg">
      <div className="h-full">
        <p>캐릭터를 선택하세요!</p>
        <div className="grid grid-cols-5 absolute top-1/2 -translate-y-1/2">
          {viewIcons.map((v) => (
            <img
              key={v.stickerId}
              className="m-5 mb-10"
              src={v.stickerUrl}
              alt={`${v.stickerId}pic`}
              onClick={() => clickSticker(v.stickerUrl)}
            />
          ))}
        </div>
      </div>
      <PageController currentPage={page} setCurrentPage={setPage} />
    </div>
  );
};
export default Characters;
