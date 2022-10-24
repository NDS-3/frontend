import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { AllLetterType, EachLetterType } from "../type";

const { persistAtom } = recoilPersist();

export const viewLetterListState = atom<AllLetterType[]>({
  key: "viewLetterListState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const letterState = atom<EachLetterType>({
  key: "letterState",
  default: {
    letterId: -1,
    sticker: {
      id: -1,
      image_url: "",
    },
    content: "",
  },
});
