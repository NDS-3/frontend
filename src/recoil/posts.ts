import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export interface AllLetter {
  letterId: number;
  stickerUrl: string;
}

export interface EachLetter {
  letterId: number;
  stickerUrl: string;
  content: string;
}

export const viewLetterListState = atom<AllLetter[]>({
  key: "viewLetterListState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const letterState = atom<EachLetter>({
  key: "letterState",
  default: {
    letterId: -1,
    stickerUrl: "",
    content: "",
  },
});
