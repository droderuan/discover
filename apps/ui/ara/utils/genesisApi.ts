import axios from 'axios';

const genesis = {
  api_url: process.env.GENESIS_URL,
  fetcher: (url) => fetch(url).then((res) => res.json()),
} as const;
export default genesis;

export const api = axios.create({
  baseURL: `http://localhost:9002/api`,
});
