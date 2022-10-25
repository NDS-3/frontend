import { apiClient } from ".";
import { PatchUserNameType } from "../type";

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

export const getUrl = async (token: string) => {
  const response = await apiClient.get("/users/me/encryption", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("👀 getUrl response", response);
  return response.data;
};

export const patchUserName = async (data: PatchUserNameType) => {
  const response = await apiClient.patch(`/users/${data.id}`, data, {
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // }
  });
  console.log("👀 patchUserName response", response);
  return response.data;
};
