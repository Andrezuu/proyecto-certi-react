export interface IExchangeRate {
    id: string;
    date: string;
    currency: string;
    buy: number;
    sell: number;
    exchangeHouseId?: number;
}