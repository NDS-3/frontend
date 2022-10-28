import { apiClient } from ".";
import { PatchLetterType, PostLetterType, GetLetterType } from "../type";

export const getLetterList = async (id: number, page: number) => {
  const response = await apiClient.get(`/users/${id}/letters/?page=${page}`);
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
  return response;
};

export const postLetter = async (data: PostLetterType) => {
  const { id } = data;
  delete data.id;
  const response = await apiClient.post(`/users/${id}/letters`, data);
  return response.data;
};

export const patchLetter = async (data: PatchLetterType) => {
  const response = await apiClient.patch(`/letters/${data.letterId}`, data);
  return response.data;
};

export const deleteLetter = async (letterId: number) => {
  const response = await apiClient.delete(`/letters/${letterId}`);
  return response.data;
};
