import React, { useEffect } from "react";
import { Typography, Grid, Paper, Box, Divider, Chip } from "@mui/material";
import { useQuotes } from "../hooks/useQuotes";
import {
  fetchOfficialRates,
  fetchParallelRates,
} from "../services/quoteService";
import { useUserContext } from "../context/UserContext";

const CotizacionesPage = () => {
  const { quotes, setQuotes, markVolatility } = useQuotes();
  const { user } = useUserContext();

  useEffect(() => {
    const fetchData = async () => {
      const official = await fetchOfficialRates();
      const parallel = await fetchParallelRates();

      const merged = parallel.map((house) => {
        const o = official
          .filter((r) => r.currency === house.currency)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

        return {
          name: house.name,
          address: house.address,
          currency: house.currency,
          official: o ? { buy: o.buy, sell: o.sell, date: o.date } : null,
          parallel: { buy: house.buy, sell: house.sell },
          volatile: false,
        };
      });

      setQuotes(merged);

      if (typeof user?.alertThreshold === "number") {
        console.log("Umbral de alerta:", user.alertThreshold);
        markVolatility(user.alertThreshold);
      } else {
        console.log("Alerta no habilitada o umbral inválido");
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  if (!user) {
    return (
      <Typography variant="h6">
        Cargando configuraciones de usuario...
      </Typography>
    );
  }

  const alertQuotes = quotes.filter((q) => q.volatile);

  const groupedByCurrency = quotes.reduce((acc, quote) => {
    if (!acc[quote.currency]) acc[quote.currency] = [];
    acc[quote.currency].push(quote);
    return acc;
  }, {} as Record<string, typeof quotes>);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Comparación de Cotizaciones por Casa de Cambio
      </Typography>

      <Typography variant="body1" sx={{ mb: 3 }}>
        Se muestran las tasas oficiales y paralelas según cada casa de cambio.
        Si la diferencia entre ambas supera tu umbral de alerta (<strong>{user.alertThreshold}%</strong>), se marcará como una cotización <strong>volátil</strong>.
      </Typography>

      {alertQuotes.length > 0 && (
        <Box
          sx={{
            mb: 3,
            p: 2,
            border: "1px solid red",
            backgroundColor: "#fff0f0",
            color: "red",
            borderRadius: 1,
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            ⚠️ Alertas de Cotizaciones Inestables:
          </Typography>
          {alertQuotes.map((q, i) => (
            <Typography key={i}>
              - {q.name} ({q.currency}): Diferencia supera el umbral ({user.alertThreshold}%)
            </Typography>
          ))}
        </Box>
      )}

      {Object.keys(groupedByCurrency).map((currency) => (
        <Box key={currency} sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            {currency}
          </Typography>
          <Grid container spacing={3}>
            {groupedByCurrency[currency].map((q, index) => (
              <Grid size={{ xs: 12, md: 6 }} key={index}>
                <Paper
                  elevation={4}
                  sx={{
                    p: 2,
                    borderLeft: q.volatile ? "5px solid red" : "5px solid #1976d2",
                    backgroundColor: q.volatile ? "#fff5f5" : "#f4f6f8",
                    transition: "0.3s",
                  }}
                >
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">{q.name}</Typography>
                    {q.volatile && (
                      <Chip
                        label="¡Cotización inestable!"
                        color="error"
                        size="small"
                      />
                    )}
                  </Box>

                  <Typography variant="subtitle2" color="text.secondary">
                    {q.address}
                  </Typography>

                  <Divider sx={{ my: 1 }} />

                  {q.official && (
                  <>
                    <Typography variant="subtitle2" color="text.secondary">
                      Oficial (
                      {q.official.date && !isNaN(new Date(q.official.date).getTime())
                        ? new Date(q.official.date).toLocaleDateString()
                        : "Sin fecha"}
                      )
                    </Typography>
                    <Typography>
                      Compra: <strong>{q.official.buy}</strong> | Venta:{" "}
                      <strong>{q.official.sell}</strong>
                    </Typography>
                  </>
                )}

                  <Typography variant="subtitle2" color="text.secondary" mt={1}>
                    Paralelo (actual)
                  </Typography>
                  <Typography>
                    Compra: <strong>{q.parallel.buy}</strong> | Venta:{" "}
                    <strong>{q.parallel.sell}</strong>
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default CotizacionesPage;
