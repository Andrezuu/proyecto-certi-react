import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import { getExchangeHouses } from "../services/exchangeHouseService";
import type { IExchangeHouse } from "../models/exchangeHouseModel";


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
  selectedHouse?: IExchangeHouse | null;
  selectedLatLng?: { lat: number; lng: number } | null;
  onLatLngChange?: (lat: number, lng: number) => void;
}

const CenterMap = ({ lat, lng }: { lat: number; lng: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], 17);
  }, [lat, lng, map]);
  return null;
};

const ClickHandler = ({ onClick }: { onClick: (lat: number, lng: number) => void }) => {
  useMapEvent("click", (e) => {
    onClick(e.latlng.lat, e.latlng.lng);
  });
  return null;
};

const ExchangeMap = ({ selectedHouse, selectedLatLng, onLatLngChange }: ExchangeMapProps) => {
  const [houses, setHouses] = useState<IExchangeHouse[]>([]);
  console.log("ExchangeMap selectLatLng:", selectedLatLng);

  useEffect(() => {
    getExchangeHouses()
      .then(setHouses)
      .catch(console.error);
  }, []);

  return (
    <MapContainer
      center={selectedLatLng || [-16.5, -68.15]}
      zoom={selectedLatLng ? 15 : 6}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {selectedHouse && <CenterMap lat={selectedHouse.lat} lng={selectedHouse.lng} />}
      {selectedLatLng && <CenterMap lat={selectedLatLng.lat} lng={selectedLatLng.lng} />}

      {onLatLngChange && <ClickHandler onClick={onLatLngChange} />}

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

      {selectedLatLng && !selectedHouse && (
        <Marker position={[selectedLatLng.lat, selectedLatLng.lng]} icon={selectedIcon}>
          <Popup>Ubicación seleccionada</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default ExchangeMap;
