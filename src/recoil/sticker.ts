import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { StickerType } from "../type";

const { persistAtom } = recoilPersist();

export const stickerListState = atom<StickerType[]>({
  key: "stickerListState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
