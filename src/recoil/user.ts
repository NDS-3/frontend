import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { OwnerType } from "../type";

const { persistAtom } = recoilPersist();

export const ownerState = atom<OwnerType>({
  key: "ownerState",
  default: {
    id: 1,
    username: "기본이름",
    personalUrl: "sGY2u_NeYOs7j_OUlgyVSA",
  },
  // effects_UNSTABLE: [persistAtom],
});
