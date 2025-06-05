import jsonServerInstance from '../api/jsonInstance';

export const getLatestOfficialRate = async (currency: string) => {
  const response = await jsonServerInstance.get('/officialExchangeRate', {
    params: { currency, _sort: 'date', _order: 'desc', _limit: 1 },
  });
  return response.data[0]; // Último valor
};

export const getParallelRateAverage = async (currency: string) => {
  const response = await jsonServerInstance.get('/exchangeHouses', {
    params: { currency },
  });

  const houses = response.data.filter((house: any) => house.sell < 100);
  if (houses.length === 0) return null;

  const buyAvg =
    houses.reduce((acc: number, item: any) => acc + item.buy, 0) /
    houses.length;
  const sellAvg =
    houses.reduce((acc: number, item: any) => acc + item.sell, 0) /
    houses.length;

  return {
    currency,
    buy: parseFloat(buyAvg.toFixed(2)),
    sell: parseFloat(sellAvg.toFixed(2)),
  };
};

export const getParallelRateHistory = async (currency: string) => {
  const response = await jsonServerInstance.get('/history', {
    params: { currency, _sort: 'date', _order: 'asc' },
  });
  return response.data;
};

export const getAvailableCurrencies = async (): Promise<string[]> => {
  const response = await jsonServerInstance.get('/officialExchangeRate');
  const currencies = [...new Set(response.data.map((item: any) => item.currency as string))] as string[];
  return currencies;
};