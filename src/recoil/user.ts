import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { OwnerType } from "../type";

const { persistAtom } = recoilPersist();

export const ownerState = atom<OwnerType>({
  key: "ownerState",
  default: {
    id: -1,
    username: "",
    personalUrl: "",
  },
  effects_UNSTABLE: [persistAtom],
});

export const isOwnerState = atom<boolean>({
  key: "isOwnerState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const googleJWTState = atom<string>({
  key: "googleJWTState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
