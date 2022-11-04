import { atom } from "recoil";
import { EachLetterType } from "../type";

export const letterState = atom<EachLetterType>({
  key: "letterState",
  default: {
    id: -1,
    sticker: {
      id: -1,
      imageUrl: "",
    },
    content: "",
  },
});
