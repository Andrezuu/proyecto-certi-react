import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import ExchangeMap from "./ExchangeMap";
import type { IExchangeHouse } from "../models/exchangeHouseModel";
import { useEffect } from "react";

const exchangeHouseSchema = yup.object({
  name: yup.string().required("El nombre es requerido"),
  address: yup.string().required("La dirección es requerida"),
  lat: yup.number().required("La latitud es requerida"),
  lng: yup.number().required("La longitud es requerida"),
  currency: yup.string().required("La moneda es requerida"),
  buy: yup
    .number()
    .typeError("Debe ser un número válido")
    .min(0, "El valor de compra no puede ser negativo")
    .required("El valor de compra es requerido"),
  sell: yup
    .number()
    .typeError("Debe ser un número válido")
    .min(0, "El valor de venta no puede ser negativo")
    .required("El valor de venta es requerido"),
});

interface ExchangeHouseFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: IExchangeHouse) => Promise<void>;
  initialValues: IExchangeHouse;
}

const ExchangeHouseForm = ({
  open,
  onClose,
  onSubmit,
  initialValues,
}: ExchangeHouseFormProps) => {

  const formik = useFormik({
    initialValues,
    validationSchema: exchangeHouseSchema,
    onSubmit: async (values) => {
      await onSubmit(values);
      onClose();
    },
  });

  useEffect(() => {
    console.log("ExchangeHouseForm initialValues:", initialValues);
    formik.setValues(initialValues);
  }, [initialValues])

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {initialValues.id ? "Editar Casa de Cambio" : "Agregar Casa de Cambio"}
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            name="name"
            label="Nombre"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            fullWidth
            margin="dense"
            name="address"
            label="Dirección"
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />
          <Box sx={{ height: "300px", width: "100%", marginTop: "20px" }}>
            <ExchangeMap
              selectedLatLng={{
                lat: formik.values.lat,
                lng: formik.values.lng,
              }}
              onLatLngChange={(lat, lng) => {
                formik.setFieldValue("lat", lat);
                formik.setFieldValue("lng", lng);
              }}
            />
          </Box>
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
          <TextField
            fullWidth
            margin="dense"
            name="buy"
            label="Compra"
            type="number"
            value={formik.values.buy}
            onChange={formik.handleChange}
            error={formik.touched.buy && Boolean(formik.errors.buy)}
            helperText={formik.touched.buy && formik.errors.buy}
          />
          <TextField
            fullWidth
            margin="dense"
            name="sell"
            label="Venta"
            type="number"
            value={formik.values.sell}
            onChange={formik.handleChange}
            error={formik.touched.sell && Boolean(formik.errors.sell)}
            helperText={formik.touched.sell && formik.errors.sell}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClose} color="info">
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

export default ExchangeHouseForm;
