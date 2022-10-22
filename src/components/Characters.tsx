import React, { useState, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { stickerListState, Sticker } from "../recoil/stickers";
import { letterState } from "../recoil/posts";
import PageController from "./PageController";
import { dummyIconList } from "../dummy";
import { showModalState, showStickerModalState } from "../recoil/modal";

interface IProps {
  createOrUpdate: string;
}
interface Istate {
  icon: Sticker;
}

const Characters = ({ createOrUpdate }: IProps) => {
  const [page, setPage] = useState(0);
  const [originIcons, setOriginIcons] = useRecoilState(stickerListState);
  const [letter, setLetter] = useRecoilState(letterState);
  const [viewIcons, setViewIcons] = useState<Istate["icon"][]>([]);
  const setShowModal = useSetRecoilState(showModalState);
  const setShowStickersModal = useSetRecoilState(showStickerModalState);

  useEffect(() => {
    setOriginIcons(dummyIconList);
  }, []);

  useEffect(() => {
    const start = page * 10;
    setViewIcons(originIcons.slice(start, start + 10));
  }, [originIcons]);

  const clickSticker = (url: string) => {
    setLetter({ ...letter, stickerUrl: url });
    setShowStickersModal(false);
    if (createOrUpdate === "create") {
      setShowModal("쓰기");
    }
  };

  return (
    <div className="w-2/3 h-2/3 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-20 py-5 bg-white rounded-lg">
      <div className="h-full mx-auto">
        <p className="mt-5 text-3xl">캐릭터를 선택하세요!</p>
        <div className="w-4/5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid grid-cols-5">
          {viewIcons.map((v) => (
            <div key={v.stickerId} className="my-10">
              <img
                className="mx-auto cursor-pointer hover:scale-110 transition-all"
                src={v.stickerUrl}
                alt={`${v.stickerId}pic`}
                onClick={() => clickSticker(v.stickerUrl)}
              />
            </div>
          ))}
        </div>
      </div>
      <PageController currentPage={page} setCurrentPage={setPage} />
    </div>
  );
};
export default Characters;
