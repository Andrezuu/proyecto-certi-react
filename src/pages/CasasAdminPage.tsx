// src/pages/CasasAdminPage.tsx
import { useEffect, useState } from "react";
import { Button, Box, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Navigate } from "react-router-dom";
import {
  createExchangeHouse,
  deleteExchangeHouse,
  getExchangeHouses,
  updateExchangeHouse,
} from "../services/exchangeHouseService";
import type { IExchangeHouse } from "../models/IExchangeHouse";
import ExchangeHouseForm from "../components/ExchangeHouseForm";
import ExchangeHouseTable from "../components/ExchangeHouseTable";
import { useUserStore } from "../store/userStore";

const CasasAdminPage = () => {
  const user = useUserStore((state) => state.user);
  const isAdmin = useUserStore((state) => state.isAdmin);
  const [casas, setCasas] = useState<IExchangeHouse[]>([]);
  const [open, setOpen] = useState(false);
  const [editingCasa, setEditingCasa] = useState<IExchangeHouse | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCasaId, setSelectedCasaId] = useState<number | null>(null);

  // Verificar autenticación y rol
  if (!user || !isAdmin()) {
    console.log("Acceso denegado, redirigiendo a /unauthorized. User:", user);
    return <Navigate to="/unauthorized" replace />;
  }

  const fetchCasas = async () => {
    const response = await getExchangeHouses();
    setCasas(response);
  };

  useEffect(() => {
    fetchCasas();
  }, []);

  const handleOpen = (casa: IExchangeHouse | null = null) => {
    setEditingCasa(casa);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingCasa(null);
  };

  const handleSubmit = async (values: IExchangeHouse) => {
    if (editingCasa) {
      await updateExchangeHouse(values, editingCasa.id);
    } else {
      await createExchangeHouse(values);
    }
    fetchCasas();
  };

  const handleDelete = async () => {
    if (selectedCasaId !== null) {
      await deleteExchangeHouse(selectedCasaId);
      fetchCasas();
    }
    setDeleteDialogOpen(false);
    setSelectedCasaId(null);
  };

  const openDeleteDialog = (id: number) => {
    setSelectedCasaId(id);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setSelectedCasaId(null);
  };

  return (
    <Box>
      <Typography variant="h4">
        Administrar Casas de Cambio
      </Typography>
      <Button
        variant="contained"
        sx={{ marginY: 2 }}
        color="primary"
        onClick={() => handleOpen()}
      >
        Agregar Casa de Cambio
      </Button>
      <ExchangeHouseTable
        casas={casas}
        onEdit={handleOpen}
        onDelete={openDeleteDialog}
      />
      <ExchangeHouseForm
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
        initialValues={
          editingCasa || {
            name: "",
            address: "",
            currency: "",
            buy: 0,
            sell: 0,
            lat: -16.5,
            lng: -68.15,
          }
        }
      />
      <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar esta casa de cambio? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="info" variant="outlined">
            Cancelar
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CasasAdminPage;