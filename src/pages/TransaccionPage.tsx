import {
  Box,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import TransactionForm from "../components/TransactionForm";
import type { ITransaction } from "../models/ITransaction";
import { useTransactions } from "../hooks/useTransactions";

export default function TransactionsPage() {
  const {
    transactions,
    user,
    users,
    submitHandler,
    openFormHandler,
    closeFormHandler,
    openForm,
    formik,
  } = useTransactions();

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 4 }}>
        Transacciones
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginBottom: 2 }}
        onClick={openFormHandler}
      >
        Crear Transacción
      </Button>
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
                        users.find((user) => user.id === transaction.receiverId)
                          ?.name
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
      <TransactionForm
        open={openForm}
        handleClose={closeFormHandler}
        formik={formik}
        users={users}
      />
    </Box>
  );
}
