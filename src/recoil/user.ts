import { atom } from "recoil";

export interface Istate {
  user: {
    username: string;
    link: string;
  };
}

export const userState = atom<Istate["user"]>({
  key: "user",
  default: {
    username: "",
    link: "",
  },
});
