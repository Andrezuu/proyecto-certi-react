export interface User {
  id: string;
  email: string;
  name: string;
  lastName: string;
  token: string;
  role?: "admin" | "user";
  alertThreshold: number;
  alertEnabled: boolean;
  preferredCurrency?: string;
}