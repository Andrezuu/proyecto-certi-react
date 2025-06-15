import { useQuotesStore } from "../store/quotesStore";

export const useQuotes = () => {
  const quotes = useQuotesStore((state) => state.quotes);
  const setQuotes = useQuotesStore((state) => state.setQuotes);
  const updateQuote = useQuotesStore((state) => state.updateQuote);

  const markVolatility = (thresholdPercent: number) => {
    const updated = quotes.map((quote) => {
      if (!quote.official) {
        return { ...quote, volatile: false };
      }

      const sellDiffPercent =
        (Math.abs(quote.parallel.sell - quote.official.sell) / quote.official.sell) * 100;
      const buyDiffPercent =
        (Math.abs(quote.parallel.buy - quote.official.buy) / quote.official.buy) * 100;

      const isVolatile =
        sellDiffPercent > thresholdPercent || buyDiffPercent > thresholdPercent;

      return {
        ...quote,
        volatile: isVolatile,
      };
    });

    // ✅ Mueve el console.table aquí
    console.table(
      updated.map((q) => ({
        name: q.name,
        sellDiff:
          (Math.abs(q.parallel.sell - q.official.sell) / q.official.sell) * 100,
        buyDiff:
          (Math.abs(q.parallel.buy - q.official.buy) / q.official.buy) * 100,
        volatile: q.volatile,
      }))
    );

    setQuotes(updated);
  };

  return { quotes, setQuotes, updateQuote, markVolatility };
};
