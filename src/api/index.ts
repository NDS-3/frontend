import axios from "axios";

// const baseURL = "http://localhost:8000";
const baseURL = "Project-ALB-988978620.ap-northeast-2.elb.amazonaws.com";

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
