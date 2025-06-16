// src/components/AlertSettings.tsx
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Typography,
  Alert,
  Box,
  CircularProgress,
  Switch,
  FormControlLabel,
  MenuItem,
} from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import InfoIcon from "@mui/icons-material/Info";
import { useUserStore } from "../store/userStore";

interface AlertSettingsProps {
  onUpdate: (updates: {
    alertThreshold: number;
    alertEnabled: boolean;
    currencyPreference: string;
  }) => void;
}

const AlertSettings = ({ onUpdate }: AlertSettingsProps) => {
  const { user } = useUserStore();
  const [alertStatus, setAlertStatus] = useState<{
    triggered: boolean;
    message: string;
    buy?: number;
    sell?: number;
    threshold?: number;
    enabled?: boolean;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      threshold: user?.alertThreshold || 0,
      enabled: user?.alertEnabled || false,
      currencyPreference: user?.currencyPreference || "USD",
    },
    validationSchema: Yup.object({
      threshold: Yup.number()
        .min(0, "El umbral debe ser mayor o igual a 0")
        .required("El umbral es obligatorio"),
      currencyPreference: Yup.string().required("La moneda es obligatoria"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await onUpdate({
          alertThreshold: values.threshold,
          alertEnabled: values.enabled,
          currencyPreference: values.currencyPreference,
        }); // Espera la actualización del backend y store
        setAlertStatus({
          triggered: false,
          message: "Configuración guardada exitosamente.",
        });
      } catch (error) {
        console.error("Error al actualizar las configuraciones:", error);
        setAlertStatus({
          triggered: true,
          message:
            "Error al actualizar las configuraciones. Inténtalo de nuevo.",
        });
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    formik.setValues({
      threshold: user?.alertThreshold || 0,
      enabled: user?.alertEnabled || false,
      currencyPreference: user?.currencyPreference || "USD",
    });
  }, [user]);

  if (loading) return <CircularProgress />;

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Configuración de Alertas y Moneda
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="threshold"
          name="threshold"
          label="Umbral de Alerta (USD)"
          type="number"
          value={formik.values.threshold}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.threshold && Boolean(formik.errors.threshold)}
          helperText={formik.touched.threshold && formik.errors.threshold}
          sx={{ mb: 2 }}
          inputProps={{ step: "0.01" }}
          disabled={!formik.values.enabled}
        />
        <FormControlLabel
          control={
            <Switch
              checked={formik.values.enabled}
              onChange={(e) =>
                formik.setFieldValue("enabled", e.target.checked)
              }
              name="enabled"
            />
          }
          label={
            formik.values.enabled ? "Alerta Activada" : "Alerta Desactivada"
          }
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          id="currencyPreference"
          name="currencyPreference"
          select
          label="Moneda Preferida"
          value={formik.values.currencyPreference}
          onChange={formik.handleChange}
          error={
            formik.touched.currencyPreference &&
            Boolean(formik.errors.currencyPreference)
          }
          helperText={
            formik.touched.currencyPreference &&
            formik.errors.currencyPreference
          }
          sx={{ mb: 2 }}
        >
          <MenuItem value="USD">USD</MenuItem>
          <MenuItem value="EUR">EUR</MenuItem>
          <MenuItem value="ARS">ARS</MenuItem>
        </TextField>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
        >
          Guardar Configuración
        </Button>
      </form>

      {alertStatus && (
        <Box sx={{ mt: 3 }}>
          <Alert
            severity={alertStatus.triggered ? "warning" : "info"}
            icon={alertStatus.triggered ? <WarningIcon /> : <InfoIcon />}
          >
            {alertStatus.message}
          </Alert>
        </Box>
      )}
    </Box>
  );
};

export default AlertSettings;
