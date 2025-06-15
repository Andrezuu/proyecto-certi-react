import { Box, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

export default function TransactionsPage() {
  // const { transactions, addTransaction, filterTransactions } = useTransactions();
  const transactions = []

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 4 }}>
        Transacciones
      </Typography>
      <Button variant="contained" color="primary" sx={{ marginBottom: 2 }}>
        Crear Transacción
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Cantidad</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Moneda</TableCell>
            <TableCell>Hora</TableCell>
            <TableCell>Cotización</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions ? transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell>{transaction.currency}</TableCell>
              <TableCell>{transaction.time}</TableCell>
              <TableCell>{transaction.rate}</TableCell>
            </TableRow>
          )) : <p> XD</p>}
        </TableBody>
      </Table>
    </Box>
  );
}