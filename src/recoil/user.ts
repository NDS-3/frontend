import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { OwnerType } from "../type";

const { persistAtom } = recoilPersist();

export const ownerState = atom<OwnerType>({
  key: "ownerState",
  default: {
    userId: -1,
    userName: "기본이름",
    url: "",
  },
  // effects_UNSTABLE: [persistAtom],
});
