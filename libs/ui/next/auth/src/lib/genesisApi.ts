import axios from 'axios';

export const genesisApi = axios.create({
  baseURL: `/genesis`,
});
