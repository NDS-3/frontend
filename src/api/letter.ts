import { apiClient } from ".";
import { EachLetter } from "../recoil/posts";

interface Istate {
  postData: {
    password: string;
    stickerUrl: string;
    content: string;
  };
  putData: EachLetter;
}

export const getLetterList = async (userId: number, page: number) => {
  const response = await apiClient.get(`user/${userId}/letters/?page=${page}`);
  return response.data;
};

export const getLetterWithPassword = async (
  userId: number,
  letterId: number,
  password: string
) => {
  const data = { password };
  const response = await apiClient.post(
    `user/${userId}/letters/${letterId}`,
    data
  );
  return response.data;
};

export const postLetter = async (userId: number, data: Istate["postData"]) => {
  const response = await apiClient.post(`user/${userId}/letters`, data);
  return response.data;
};

export const putLetter = async (letterId: number, data: Istate["putData"]) => {
  const response = await apiClient.put(`letters/${letterId}`, data);
  return response.data;
};

export const deleteLetter = async (letterId: number) => {
  const response = await apiClient.delete(`letters/${letterId}`);
  return response.data;
};
