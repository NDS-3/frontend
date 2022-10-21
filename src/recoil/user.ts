import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export interface Istate {
  user: {
    userName: string;
    url: string;
  };
}

export const userState = atom<Istate["user"]>({
  key: "user",
  default: {
    userName: "",
    url: "",
  },
  effects_UNSTABLE: [persistAtom],
});
