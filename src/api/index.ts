import axios from "axios";
// import { googleJWTState } from "../recoil/user";
// import { useRecoilState } from "recoil";

const baseURL = "http://localhost:8000";
// const [jwt] = useRecoilState(googleJWTState);

export const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
  },
});

export const tApiClient = axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
  },
});

// tApiClient.interceptors.request.use(function tkInterceptorRequest(config) {
//   return {
//     ...config,
//     headers: {
//       Authorization: `Bearer ${jwt}`,
//     },
//   };
// });
