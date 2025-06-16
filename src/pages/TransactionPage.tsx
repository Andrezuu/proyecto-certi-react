import { Box, Typography, Button } from "@mui/material";
import TransactionForm from "../components/TransactionForm";
import { useTransactions } from "../hooks/useTransactions";
import TransactionsTable from "../components/TransactionTable";

export default function TransactionsPage() {
  const {
    transactions,
    users,
    openFormHandler,
    closeFormHandler,
    openForm,
    formik,
  } = useTransactions();

  return (
    <Box sx={{ padding: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4">Transacciones</Typography>
        <Button variant="contained" color="primary" onClick={openFormHandler}>
          Crear Transacción
        </Button>
      </Box>
      <TransactionsTable transactions={transactions} />

      <TransactionForm
        open={openForm}
        handleClose={closeFormHandler}
        formik={formik}
        users={users}
      />
    </Box>
  );
}
