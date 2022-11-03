import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { OwnerType, isCheckType } from "../type";

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

export const googleJWTState = atom<string>({
  key: "googleJWTState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const isCheckState = atom<isCheckType>({
  key: "isCheckState",
  default: {
    isOwner: false,
    isPassed: true,
  },
});
