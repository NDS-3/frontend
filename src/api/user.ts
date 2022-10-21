import { apiClient } from ".";

export const getUserInfo = async (url: string) => {
  const response = await apiClient.get(`user/${url}`);
  return response.data;
};

export const getSticker = async () => {
  const response = await apiClient.get(`stickers`);
  return response.data;
};

export const getUrl = async (userId: number) => {
  const response = await apiClient.get(`user/${userId}/encryption`);
  return response.data;
};
