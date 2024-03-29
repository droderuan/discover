import axios, { AxiosRequestConfig } from 'axios';

/**
 * As the project has a proxy layer,
 * is not necessary to set a default url when calling some api project
 */
export const createApi = (config?: AxiosRequestConfig) => {
  return axios.create(config);
};
