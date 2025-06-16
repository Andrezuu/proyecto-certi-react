import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useUserContext, type User } from "../context/UserContext";

interface TransactionFormProps {
  open: boolean;
  handleClose: () => void;
  formik: any;
  users: User[];
}
const TransactionForm = ({
  open,
  handleClose,
  formik,
  users,
}: TransactionFormProps) => {
  const { user } = useUserContext();
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Realizar Transacción</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Typography sx={{ marginBottom: 2 }}>
            Saldo disponible: ${user?.wallet.toFixed(2)}
          </Typography>
          <TextField
            fullWidth
            name="amount"
            label="Cantidad"
            type="number"
            value={formik.values.amount}
            onChange={formik.handleChange}
            error={formik.touched.amount && Boolean(formik.errors.amount)}
            helperText={formik.touched.amount && formik.errors.amount}
          />
          <InputLabel>Tipo</InputLabel>
          <Select
            fullWidth
            name="type"
            margin="dense"
            value={formik.values.type}
            onChange={formik.handleChange}
            error={formik.touched.type && Boolean(formik.errors.type)}
          >
            <MenuItem value="Compra">Compra</MenuItem>
            <MenuItem value="Venta">Venta</MenuItem>
          </Select>
          {formik.touched.type && formik.errors.type && (
            <div style={{ color: "red", fontSize: "0.75rem" }}>
              {formik.errors.type}
            </div>
          )}
          <TextField
            fullWidth
            margin="dense"
            name="currency"
            label="Moneda"
            value={formik.values.currency}
            onChange={formik.handleChange}
            error={formik.touched.currency && Boolean(formik.errors.currency)}
            helperText={formik.touched.currency && formik.errors.currency}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Receptor</InputLabel>
            <Select
              name="receiverId"
              value={formik.values.receiverId}
              onChange={formik.handleChange}
              error={
                formik.touched.receiverId && Boolean(formik.errors.receiverId)
              }
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name} {user.lastName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose} color="info">
            Cancelar
          </Button>
          <Button variant="contained" type="submit" color="primary">
            Guardar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TransactionForm;
