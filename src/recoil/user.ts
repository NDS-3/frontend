import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export interface Istate {
  owner: {
    userId: number;
    userName: string;
    url: string;
  };
}

export const ownerState = atom<Istate["owner"]>({
  key: "ownerState",
  default: {
    userId: -1,
    userName: "기본이름",
    url: "",
  },
  effects_UNSTABLE: [persistAtom],
});
