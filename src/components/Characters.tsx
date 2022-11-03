import { useState, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { stickerListState } from "../recoil/sticker";
import { StickerType } from "../type";
import { letterState } from "../recoil/letter";
import { showModalState, showStickerModalState } from "../recoil/modal";
import { getStickers } from "../api/user";
import { useQuery } from "react-query";

interface IProps {
  createOrUpdate: string;
}

const Characters = ({ createOrUpdate }: IProps) => {
  const [page, setPage] = useState(0);

  const [originIcons, setOriginIcons] = useRecoilState(stickerListState);
  const [viewIcons, setViewIcons] = useState<StickerType[]>([]);

  const setShowModal = useSetRecoilState(showModalState);
  const setLetter = useSetRecoilState(letterState);
  const setShowStickersModal = useSetRecoilState(showStickerModalState);

  useQuery<StickerType[]>(["getStickers"], () => getStickers(), {
    onSuccess: (data) => {
      console.log("🎁 Success getStickers:", data);
      setOriginIcons(data);
    },
  });

  useEffect(() => {
    const start = page * 10;
    setViewIcons(originIcons.slice(start, start + 10));
  }, [originIcons, page]);

  const clickSticker = (sticker: StickerType) => {
    setLetter((prevLetter) => ({ ...prevLetter, sticker }));
    setShowStickersModal(false);
    if (createOrUpdate === "create") {
      setShowModal("쓰기");
    }
  };

  const pageChange = (v: number) => {
    const newPage = page + v;
    if (newPage >= 0 && newPage <= 2) setPage(newPage);
  };

  return (
    <div className="flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 py-8 bg-white rounded-lg">
      <div className="my-auto pl-1">
        <img
          className={
            page < 1
              ? "invisible cursor-pointer hover:scale-90 transition-all"
              : "cursor-pointer hover:scale-90 transition-all"
          }
          src={`${process.env.PUBLIC_URL}/img/left.png`}
          alt="left"
          onClick={() => pageChange(-1)}
        />
      </div>
      <div className="relative h-full w-full flex flex-col justify-center items-center">
        <p className="text-3xl">캐릭터를 선택하세요!</p>
        <div className="w-4/5 grid grid-cols-5 gap-1">
          {viewIcons.map((v) => (
            <div key={v.id} className="pt-10">
              <img
                className="mx-auto cursor-pointer hover:scale-110 transition-all"
                src={v.imageUrl}
                alt={`${v.id}pic`}
                onClick={() => clickSticker(v)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="my-auto pr-1">
        <img
          className={
            page > 1
              ? "invisible cursor-pointer hover:scale-90 transition-all"
              : "cursor-pointer hover:scale-90 transition-all"
          }
          src={`${process.env.PUBLIC_URL}/img/right.png`}
          alt="right"
          onClick={() => pageChange(1)}
        />
      </div>
    </div>
  );
};
export default Characters;
