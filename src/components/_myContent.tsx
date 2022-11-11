import { useRecoilState, useRecoilValue } from "recoil";
import { letterState } from "../recoil/letter";
import { getMyLetter } from "../api/letter";
import { useQuery } from "react-query";
import { googleJWTState } from "../recoil/user";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
// import { toPng } from "html-to-image";
import html2canvas from "html2canvas";

const _myContent = () => {
  const [flag, setFlag] = useState(false);
  const jwt = useRecoilValue(googleJWTState);
  const [letter, setLetter] = useRecoilState(letterState);

  useQuery(["getMyLetterDetail", flag], () => getMyLetter(letter.id, jwt), {
    onSuccess: (res: AxiosResponse) => {
      setFlag(false);
      setLetter(res.data);
    },
    onError: () => {
      setFlag(false);
    },
    enabled: flag,
  });

  useEffect(() => {
    if (!flag) setFlag(true);
  }, []);

  // const clickLetterCapture = () => {
  //   const el: HTMLElement | null = document.getElementById("root");
  //   const filename = "rolling-paper.png";
  //   if (!!el) {
  //     toPng(el).then((image) => {
  //       const aTag = document.createElement("a");
  //       aTag.href = image;
  //       aTag.download = filename;
  //       aTag.click();
  //       aTag.remove();
  //     });
  //   }
  // };

  const clickLetterCapture = () => {
    const element: HTMLElement | null = document.getElementById("root");
    if (!!element) {
      html2canvas(element).then((canvas: HTMLCanvasElement) => {
        onSaveAs(canvas.toDataURL("image/jpeg"), "rolling-paper.jpg");
      });
    }
  };

  const onSaveAs = (url: string, filename: string) => {
    const a: HTMLAnchorElement = document.createElement("a");
    a.href = url.replace("image/jpeg", "image/octet-stream");
    a.download = filename;
    a.click();
  };

  return (
    <div
      className="w-full h-full text-xl py-3 flex flex-col justify-between absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      id="capture-letter"
    >
      <div className="h-1/5 pl-6">
        <img
          className="h-full aspect-square"
          src={letter.sticker.imageUrl}
          alt="character"
        />
      </div>
      <div className="h-2/3 px-10 break-all whitespace-pre-line overflow-y-auto">
        {letter.content}
      </div>
      <div className="mr-1 flex justify-end">
        <button
          className="py-1 px-3 mr-5 rounded-lg shadow-md bg-my-button hover:bg-my-button-hover hover:text-white"
          onClick={() => clickLetterCapture()}
        >
          편지 저장
        </button>
      </div>
    </div>
  );
};

export default _myContent;
