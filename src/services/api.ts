import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import {StatusCodes} from 'http-status-codes';

const STATUS_CODES_MAPPING: Set<StatusCodes> = new Set([
  StatusCodes.BAD_REQUEST,
  StatusCodes.NOT_FOUND,
]);

const shouldDisplayError = (response: AxiosResponse) => STATUS_CODES_MAPPING.has(response.status);

const BACKEND_URL = 'https://backend.com';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response && shouldDisplayError(error.response)) {
        console.log(error.response.data);
      }

      throw error;
    }
  );

  return api;
};
