import React, { useState, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { stickerListState } from "../recoil/stickers";
import { StickerType } from "../type";
import { letterState } from "../recoil/letters";
import PageController from "./PageController";
import { showModalState, showStickerModalState } from "../recoil/modal";
import { getStickers } from "../api/user";
import { useQuery } from "react-query";

interface IProps {
  createOrUpdate: string;
}

const Characters = ({ createOrUpdate }: IProps) => {
  const [page, setPage] = useState(0);
  const [originIcons, setOriginIcons] = useRecoilState(stickerListState);
  const [letter, setLetter] = useRecoilState(letterState);
  const [viewIcons, setViewIcons] = useState<StickerType[]>([]);
  const setShowModal = useSetRecoilState(showModalState);
  const setShowStickersModal = useSetRecoilState(showStickerModalState);

  const { data } = useQuery<StickerType[]>(
    ["getStickers"],
    () => getStickers(),
    {
      onSuccess: (data) => {
        console.log("🎁 Success getStickers:", data);
        setOriginIcons(data);
      },
    }
  );

  useEffect(() => {
    const start = page * 10;
    setViewIcons(originIcons.slice(start, start + 10));
  }, [originIcons, page]);

  const clickSticker = (sticker: StickerType) => {
    setLetter({ ...letter, sticker });
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
            <div key={v.id} className="my-10">
              <img
                className="mx-auto cursor-pointer hover:scale-110 transition-all"
                src={v.image_url}
                alt={`${v.id}pic`}
                onClick={() => clickSticker(v)}
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
