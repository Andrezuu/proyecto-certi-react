import { useState } from "react";
import {
  Button,
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import type { IExchangeHouse } from "../models/IExchangeHouse";
import ExchangeHouseForm from "../components/ExchangeHouseForm";
import ExchangeHouseTable from "../components/ExchangeHouseTable";
import { useExchangeManagement } from "../hooks/useExchangeManagement";

const AdminPage = () => {
  const {
    casas,
    crearCasa,
    actualizarCasa,
    eliminarCasa,
  } = useExchangeManagement();

  const [open, setOpen] = useState(false);
  const [editingCasa, setEditingCasa] = useState<IExchangeHouse | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCasaId, setSelectedCasaId] = useState<number | null>(null);

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
      await actualizarCasa(values, editingCasa.id!);
    } else {
      await crearCasa(values);
    }
    handleClose();
  };

  const handleDelete = async () => {
    if (selectedCasaId !== null) {
      await eliminarCasa(selectedCasaId);
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
      <Typography variant="h4">Administrar Casas de Cambio</Typography>
      <Button
        variant="contained"
        sx={{ marginY: 2 }}
        color="primary"
        onClick={() => handleOpen()}
      >
        Agregar Casa de Cambio
      </Button>
      <ExchangeHouseTable casas={casas} onEdit={handleOpen} onDelete={openDeleteDialog} />
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
            commission: 0,
            minimumCapital: 0,
            startTime: "",
            endTime: "",
            operatingHours: "",
          }
        }
      />
      <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás segura de que deseas eliminar esta casa de cambio? Esta acción no se puede
            deshacer.
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

export default AdminPage;
