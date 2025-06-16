export interface ITransaction {
  id?: string;
  amount: number;
  type: string;
  currency: string;
  time: string;
  rate: number;
  senderId: string;
  receiverId: string;
  exchangeHouseId: string;
}