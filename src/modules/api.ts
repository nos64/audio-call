import { AxiosResponse } from 'axios';
import axiosInstance from './axiosInstance';
import { Words } from './types';

export const getWords = (group: number, page: number): Promise<AxiosResponse<Words[]>> => axiosInstance.get(`/words?group=${group}&page=${page}`);

export const getWord = (id: string): Promise<AxiosResponse<Words>> => axiosInstance.get(`/words/${id}`);

// export const getData = async (group: number, page: number) => {
//   try {
//     return await API.get(`/words?group=${group}&page=${page}`);
//   } catch (error) {
//     console.error(error);
//   }
// };
