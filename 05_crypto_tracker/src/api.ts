const BASE_URL = `https://api.coinpaprika.com/v1`;

export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinHistory(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 7;
  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
  ).then((response) => response.json());
}

export function fetchCryptosFromCoinGecko() {
  return fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1`
  ).then((response) => response.json());
}

export function fetchCryptoInfo(cryptoId: string) {
  return fetch(
    `https://api.coingecko.com/api/v3/coins/${cryptoId}?localization=false`
  ).then((response) => response.json());
}

export function fetchMarketChart(cryptoId: string, from: string, to: string) {
  return fetch(`https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart/range?vs_currency=usd&from=${from}&to=${to}
	`);
}
