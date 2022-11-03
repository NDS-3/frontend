import axios from "axios";

// const baseURL = "http://localhost:8000";
const baseURL = "https://api.3team.shop";
// const baseURL = "http://project-alb-988978620.ap-northeast-2.elb.amazonaws.com";

export const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
