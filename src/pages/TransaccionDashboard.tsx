import { Box, Grid, Paper, Typography } from "@mui/material";
import { useTransactions } from "../hooks/useTransactions";
import TransactionMetrics from "../components/TransactionMetrics";
import TransactionChart from "../components/TransactionChart";

const TransaccionDashboardPage = () => {
  const { transactions } = useTransactions();

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Estadísticas de Transacciones
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <TransactionMetrics transactions={transactions} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <TransactionChart />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TransaccionDashboardPage;
