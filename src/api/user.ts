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
  const response = await apiClient.get("/users/me/encryption", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.personalUrl;
};

export const patchUserName = async (data: PatchUserNameType) => {
  const { jwt } = data;
  delete data.jwt;
  const response = await apiClient.patch("/users/me", data, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return response.data;
};

export const getCheckPassedDate = async () => {
  const response = await apiClient.get("/days/check");
  return response.data.isPassed;
};
