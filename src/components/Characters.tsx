import React, { useState, useEffect } from "react";
import PageController from "./PageController";
import { dummyIconList } from "../dummy";

interface Istate {
  icon: {
    id: number;
    url: string;
  };
}

const Characters = () => {
  const [page, setPage] = useState(0);
  const [originIcons, setOriginIcons] = useState<Istate["icon"][]>([]);
  const [viewIcons, setViewIcons] = useState<Istate["icon"][]>([]);

  useEffect(() => {
    setOriginIcons(dummyIconList);
  }, []);

  useEffect(() => {
    const start = page * 10;
    setViewIcons(originIcons.slice(start, start + 10));
  }, [originIcons]);

  return (
    <div className="w-2/3 h-2/3 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-20 py-5 bg-white rounded-lg">
      <p>캐릭터를 선택하세요!</p>
      <div className="grid grid-cols-5">
        {viewIcons.map((v) => (
          <img key={v.id} className="p-1" src={v.url} alt={`${v.id}pic`} />
        ))}
      </div>
      <div className="relative">
        <PageController currentPage={page} setCurrentPage={setPage} />
      </div>
    </div>
  );
};
export default Characters;
