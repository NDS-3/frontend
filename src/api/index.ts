import axios from "axios";

const baseURL = "http://localhost:8000";

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
