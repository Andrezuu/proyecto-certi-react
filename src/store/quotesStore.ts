import { create } from 'zustand';

type Quote = {
  name: string;
  address: string;
  currency: string;
  official: { buy: number; sell: number };
  parallel: { buy: number; sell: number };
  volatile: boolean;
};

type QuotesState = {
  quotes: Quote[];
  setQuotes: (newQuotes: Quote[]) => void;
  updateQuote: (currency: string, newData: Partial<Quote>) => void;
};

export const useQuotesStore = create<QuotesState>((set) => ({
  quotes: [],
  setQuotes: (newQuotes) => set({ quotes: newQuotes }),
  updateQuote: (currency, newData) =>
    set((state) => ({
      quotes: state.quotes.map((q) =>
        q.currency === currency ? { ...q, ...newData } : q
      ),
    })),
}));
