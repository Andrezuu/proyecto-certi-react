export interface IExchangeHouse {
  id?: number;
  name: string;
  address: string;
  lat: number;
  lng: number;
  currency: string;
  buy: number;
  sell: number;
  commission: number;
  minimumCapital: number;
  startTime: string,
  endTime: string,
  operatingHours: string,

}
