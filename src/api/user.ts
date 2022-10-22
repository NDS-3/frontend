import { apiClient } from ".";

export const getUserInfo = async (url: string) => {
  const response = await apiClient.get(`user/${url}`);
  console.log("getUserInfo: ", response.data);
  return response.data;
};

export const getSticker = async () => {
  const response = await apiClient.get(`stickers`);
  console.log("getSticker: ", response.data);
  return response.data;
};

export const getUrl = async (userId: number) => {
  const response = await apiClient.get(`user/${userId}/encryption`);
  console.log("getUrl: ", response.data);
  return response.data;
};
