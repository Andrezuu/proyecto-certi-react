import jsonInstance from "../api/jsonInstance";

export const fetchOfficialRates = async () => {
  const res = await jsonInstance.get("/officialExchangeRate");
  return res.data;
};

export const fetchParallelRates = async () => {
  // Puedes generar paralelos simulados aquí
  const res = await jsonInstance.get("/exchangeHouses");
  return res.data.map((h: any) => ({
    name: h.name,
    address: h.address,
    currency: h.currency,
    buy: h.buy,
    sell: h.sell,
  }));
};
