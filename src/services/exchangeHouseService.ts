// src/services/exchangeHouseService.ts
import jsonServerInstance from "../api/jsonInstance";

export const getExchangeHouses = async () => {
  const response = await jsonServerInstance.get("/exchangeHouses");
  return response.data;
};
