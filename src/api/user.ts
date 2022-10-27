import { apiClient } from ".";
import { PatchUserNameType } from "../type";

export const getUserInfo = async (url: string) => {
  const response = await apiClient.get(`/users/${url}`);
  return response.data;
};

export const getStickers = async () => {
  const response = await apiClient.get("/stickers");
  return response.data;
};

export const getUrl = async (token: string) => {
  console.log("here!");
  const response = await apiClient.get("/users/me/encryption", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const patchUserName = async (data: PatchUserNameType) => {
  const response = await apiClient.patch(`/users/${data.id}`, data, {
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // }
  });
  return response.data;
};
