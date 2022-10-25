import { apiClient } from ".";
import { PatchLetterType, PostLetterType, GetLetterType } from "../type";

export const getLetterList = async (id: number, page: number) => {
  const response = await apiClient.get(`/users/${id}/letters/?page=${page}`);
  console.log("👀 getLetterList response", response);
  return response.data;
};

export const getLetterWithPassword = async (data: GetLetterType) => {
  const { id, letterId } = data;
  delete data.id;
  delete data.letterId;
  const response = await apiClient.post(
    `/users/${id}/letters/${letterId}`,
    data
  );
  console.log("👀 getLetterWithPassword response", response);
  return response;
};

export const postLetter = async (data: PostLetterType) => {
  const { id } = data;
  delete data.id;
  console.log("data:", data);
  const response = await apiClient.post(`/users/${id}/letters`, data);
  console.log("👀 postLetter response", response);
  return response.data;
}; // ✔

export const patchLetter = async (data: PatchLetterType) => {
  const response = await apiClient.patch(`/letters/${data.letterId}`, data);
  console.log("👀 patchLetter response", response);
  return response.data;
}; // ✔

export const deleteLetter = async (letterId: number) => {
  const response = await apiClient.delete(`/letters/${letterId}`);
  console.log("👀 deleteLetter response", response);
  return response.data;
};
