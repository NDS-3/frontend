import { atom } from "recoil";

export interface AllLetter {
  letterId: number;
  stickerUrl: string;
}

export interface EachLetter {
  letterId: number;
  stickerUrl: string;
  content: string;
}

export const originLetterListState = atom<AllLetter[]>({
  key: "originLetterList",
  default: [],
});

export const viewLetterListState = atom<AllLetter[]>({
  key: "viewLetterList",
  default: [],
});

export const letterState = atom<EachLetter>({
  key: "letter",
  default: {
    letterId: -1,
    stickerUrl: "",
    content: "",
  },
});
