import { useQuotesStore } from "../store/quotesStore";

export const useQuotes = () => {
  const quotes = useQuotesStore((state) => state.quotes);
  const setQuotes = useQuotesStore((state) => state.setQuotes);
  const updateQuote = useQuotesStore((state) => state.updateQuote);

  // Ahora recibe el array y threshold, y devuelve el array modificado
  const markVolatility = (quotesArray: typeof quotes, thresholdPercent: number) => {
    const updated = quotesArray.map((quote) => {
      const official = quote.official;

      if (!official || official.buy == null || official.sell == null) {
        return { ...quote, volatile: false };
      }

      const sellDiffPercent =
        (Math.abs(quote.parallel.sell - official.sell) / official.sell) * 100;
      const buyDiffPercent =
        (Math.abs(quote.parallel.buy - official.buy) / official.buy) * 100;

      const isVolatile =
        sellDiffPercent > thresholdPercent || buyDiffPercent > thresholdPercent;

      return {
        ...quote,
        volatile: isVolatile,
      };
    });

    console.table(
      updated.map((q) => ({
        name: q.name,
        sellDiff:
          q.official && q.official.sell
            ? (Math.abs(q.parallel.sell - q.official.sell) / q.official.sell) * 100
            : "N/A",
        buyDiff:
          q.official && q.official.buy
            ? (Math.abs(q.parallel.buy - q.official.buy) / q.official.buy) * 100
            : "N/A",
        volatile: q.volatile,
      }))
    );

    return updated;
  };

  return { quotes, setQuotes, updateQuote, markVolatility };
};
