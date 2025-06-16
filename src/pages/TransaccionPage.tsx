import {
  Box,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import TransactionForm from "../components/TransactionForm";
import type { ITransaction } from "../models/ITransaction";
import { useTransactions } from "../hooks/useTransactions";

export default function TransactionsPage() {
  const {
    transactions,
    user,
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

      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Historial de Transacciones
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Monto</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Moneda</TableCell>
              <TableCell>Hora</TableCell>
              <TableCell>Descripción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions ? (
              transactions.map((transaction: ITransaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{transaction.currency}</TableCell>
                  <TableCell>
                    {new Date(transaction.time).toLocaleString("es-BO", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </TableCell>
                  <TableCell>
                    {transaction.senderId === user!.id
                      ? `Enviado a ${
                          users.find(
                            (user) => user.id === transaction.receiverId
                          )?.name
                        }`
                      : `Recibido de ${
                          users.find((user) => user.id === transaction.senderId)
                            ?.name
                        }`}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>
                  No hay transacciones disponibles
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>

      <TransactionForm
        open={openForm}
        handleClose={closeFormHandler}
        formik={formik}
        users={users}
      />
    </Box>
  );
}
