import axios from "axios";

const baseURL = "";

export const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
  },
});

export const RefApiClient = axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
    Authorization: "",
  },
});
