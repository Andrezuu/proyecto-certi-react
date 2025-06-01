import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import { getExchangeHouses } from "../services/exchangeHouseService";

interface ExchangeHouse {
  id: number;
  name: string;
  address: string;
  lat: number;
  lng: number;
  buy: number;
  sell: number;
}

const defaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const selectedIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconSize: [35, 56],
  iconAnchor: [17, 56],
});

interface ExchangeMapProps {
  selectedHouse?: ExchangeHouse | null;
}

const CenterMap = ({ lat, lng }: { lat: number; lng: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], 17);
  }, [lat, lng, map]);
  return null;
};

const ExchangeMap = ({ selectedHouse }: ExchangeMapProps) => {
  const [houses, setHouses] = useState<ExchangeHouse[]>([]);

  useEffect(() => {
    getExchangeHouses()
      .then(setHouses)
      .catch(console.error);
  }, []);

  return (
    <MapContainer
      center={[-16.5, -68.15]}
      zoom={6}
      scrollWheelZoom={true}
      style={{ height: "80vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {selectedHouse && <CenterMap lat={selectedHouse.lat} lng={selectedHouse.lng} />}

      {houses.map((house) => (
        <Marker
          key={house.id}
          position={[house.lat, house.lng]}
          icon={selectedHouse?.id === house.id ? selectedIcon : defaultIcon}
        >
          <Popup>
            <strong>{house.name}</strong>
            <br />
            {house.address}
            <br />
            Compra: {house.buy}
            <br />
            Venta: {house.sell}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default ExchangeMap;
