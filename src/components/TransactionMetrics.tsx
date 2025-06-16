import { Grid, Card, CardContent, Typography } from "@mui/material";
import { useTransactions } from "../hooks/useTransactions";

const TransactionMetrics = () => {
  const { metrics } = useTransactions();
  const { totalVolume, dailyVolume, profitLoss, averageRate } = metrics();

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 3}}>
        <Card>
          <CardContent>
            <Typography variant="h6">Volumen Total</Typography>
            <Typography variant="h4">${totalVolume.toFixed(2)}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, md: 3}}>
        <Card>
          <CardContent>
            <Typography variant="h6">Volumen Diario</Typography>
            <Typography variant="h4">${dailyVolume.toFixed(2)}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, md: 3}}>
        <Card>
          <CardContent>
            <Typography variant="h6">Ganancias/Pérdidas</Typography>
            <Typography 
              variant="h4" 
              color={profitLoss >= 0 ? "success.main" : "error.main"}
            >
              ${profitLoss.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, md: 3}}>
        <Card>
          <CardContent>
            <Typography variant="h6">Cotización Promedio</Typography>
            <Typography variant="h4">${averageRate.toFixed(2)}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default TransactionMetrics;
