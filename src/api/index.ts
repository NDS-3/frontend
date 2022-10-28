import axios from "axios";

// const baseURL = "http://localhost:8000";
const baseURL = "https://api.hjjeong.xyz/";

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
