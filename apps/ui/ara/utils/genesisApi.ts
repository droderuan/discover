const genesis = {
  api_url: process.env.GENESIS_URL,
  fetcher: (url) => fetch(url).then((res) => res.json()),
} as const;

export default genesis;
