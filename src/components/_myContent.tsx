import { useRecoilState } from "recoil";
import { letterState } from "../recoil/letter";
import { getMyLetter } from "../api/letter";
import { useQuery } from "react-query";
import { googleJWTState } from "../recoil/user";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

const _myContent = () => {
  const [letter, setLetter] = useRecoilState(letterState);
  const [jwt] = useRecoilState(googleJWTState);
  const [flag, setFlag] = useState(false);

  useQuery(["getMyLetterDetail", flag], () => getMyLetter(letter.id, jwt), {
    onSuccess: (res: AxiosResponse) => {
      setFlag(false);
      setLetter(res.data);
    },
    onError: (err: AxiosError) => {
      setFlag(false);
      console.log("🤷‍♀️ Error getMyLetterDetail:", err);
    },
    enabled: flag,
  });

  useEffect(() => {
    if (!flag) setFlag(true);
  }, []);

  const letterCapture = () => {
    alert("아직 안만들었어요");
  };

  return (
    <div className="w-full h-full text-white text-xl py-3 flex flex-col justify-between absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="h-1/5">
        <img
          className="h-full aspect-square"
          src={letter.sticker.imageUrl}
          alt="character"
        />
      </div>
      <div className="text-white h-2/3 px-10 break-all whitespace-pre-line overflow-y-auto">
        {letter.content}
      </div>
      <div className="mr-1 flex justify-end">
        <button
          className="py-1 px-3 mr-5 rounded-lg shadow-md bg-orange-300"
          onClick={() => letterCapture()}
        >
          편지 캡처
        </button>
      </div>
    </div>
  );
};

export default _myContent;
