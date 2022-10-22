import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export interface Sticker {
  stickerId: number;
  stickerUrl: string;
}

export const stickerListState = atom<Sticker[]>({
  key: "stickerListState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const slectedStickerState = atom<Sticker>({
  key: "slectedStickerState",
  default: {
    stickerId: -1,
    stickerUrl: "",
  },
  effects_UNSTABLE: [persistAtom],
});
