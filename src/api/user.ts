import { apiClient } from ".";
import { PatchUserName } from "../type";

export const getUserInfo = async (url: string) => {
  const response = await apiClient.get(`/users/${url}`);
  console.log("👀 getUserInfo response", response);
  return response.data;
};

export const getStickers = async () => {
  const response = await apiClient.get("/stickers");
  console.log("👀 getStickers response", response);
  return response.data;
};

export const getUrl = async (id: number) => {
  const response = await apiClient.get(`/users/${id}/encryption`);
  console.log("👀 getUrl response", response);
  return response.data;
};

export const patchUserName = async (data: PatchUserName) => {
  const response = await apiClient.get(`/users/${data.id}`);
  console.log("👀 patchUserName response", response);
  return response.data;
};
