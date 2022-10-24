import { apiClient } from ".";
import { PutLetterType, PostLetterType } from "../type";

export const getLetterList = async (userId: number, page: number) => {
  const response = await apiClient.get(`/user/${userId}/letters/?page=${page}`);
  console.log("👀 getLetterList response", response);
  return response.data;
};

export const getLetterWithPassword = async (
  userId: number,
  letterId: number,
  password: string
) => {
  const data = { password };
  const response = await apiClient.post(
    `/user/${userId}/letters/${letterId}`,
    data
  );
  console.log("👀 getLetterWithPassword response", response);
  return response.data;
};

export const postLetter = async (data: PostLetterType) => {
  const { userId } = data;
  delete data.userId;
  const response = await apiClient.post(`/user/${userId}/letters`, data);
  console.log("👀 postLetter response", response);
  return response.data;
}; // ✔

export const putLetter = async (data: PutLetterType) => {
  const response = await apiClient.put(`/letters/${data.letterId}`, data);
  console.log("👀 putLetter response", response);
  return response.data;
}; // ✔

export const deleteLetter = async (letterId: number) => {
  const response = await apiClient.delete(`/letters/${letterId}`);
  console.log("👀 deleteLetter response", response);
  return response.data;
};
