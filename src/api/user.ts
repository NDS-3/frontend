import { apiClient } from ".";

export const getUserInfo = async (url: string) => {
  const response = await apiClient.get(`/user/${url}`);
  // console.log("👀 getUserInfo response", response);
  return response.data;
};

export const getStickers = async () => {
  const response = await apiClient.get("/stickers");
  console.log("👀 getStickers response", response);
  return response.data;
};

export const getUrl = async (userId: number) => {
  const response = await apiClient.get(`/user/${userId}/encryption`);
  console.log("👀 getUrl response", response);
  return response.data;
};
