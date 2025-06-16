export interface ITransaction {
  id: string; 
  amount: number; 
  type: string; 
  currency: string; 
  time: string; 
  senderId: string; 
  receiverId: string; 
}