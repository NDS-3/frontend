import { atom } from "recoil";

export const showModalState = atom<string>({
  key: "showModalState",
  default: "닫기",
});

export const showStickerModalState = atom<boolean>({
  key: "showStickerModalState",
  default: false,
});
