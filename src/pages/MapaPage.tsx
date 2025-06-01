import { Grid, Typography, Card, CardContent } from "@mui/material";
import ExchangeMap from "../components/ExchangeMap";
import { useEffect, useState } from "react";
import jsonServerInstance from "../api/jsonInstance";

const MapaPage = () => {
  const [exchangeHouses, setExchangeHouses] = useState([]);
  const [selectedHouse, setSelectedHouse] = useState(null); // NUEVO

  useEffect(() => {
    const fetchData = async () => {
      const response = await jsonServerInstance.get("/exchangeHouses");
      setExchangeHouses(response.data);
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <Typography variant="h4" gutterBottom>
        Mapa de Casas de Cambio
      </Typography>

      <Grid container spacing={2} sx={{ justifyContent: "center" }}>
        <Grid
  size={4}
  sx={{
    height: "600px", // igual que el alto del mapa
    overflowY: "auto",
    pr: 1, // padding right para que no quede muy pegado al mapa
  }}
>
          <Grid container spacing={2}>
            {exchangeHouses.map((house) => (
              <Grid key={house.id} size={12}>
                <Card
                  variant="outlined"
                  onClick={() => setSelectedHouse(house)} // SELECCIONAR CASA
                  sx={{
                    cursor: "pointer",
                    borderColor:
                      selectedHouse?.id === house.id ? "primary.main" : "grey.300",
                    backgroundColor:
                      selectedHouse?.id === house.id ? "lightblue" : "white",
                  }}
                >
                  <CardContent>
                    <Typography variant="h6">{house.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Dirección: {house.address}
                    </Typography>
                    <Typography variant="body2">
                      Moneda: {house.currency}
                    </Typography>
                    <Typography variant="body2">
                      Compra: {house.buy} | Venta: {house.sell}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid size={6}>
          <div style={{ height: "600px", width: "100%" }}>
            <ExchangeMap selectedHouse={selectedHouse} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default MapaPage;
