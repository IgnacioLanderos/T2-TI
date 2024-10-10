import React from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const MapComponent = ({ flights, planes }) => {
  const position = [51.505, -0.09];

  // Íconos personalizados para los aviones y aeropuertos
  const planeIcon = L.icon({
    iconUrl: '/airplane.png',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });

  // Íconos diferenciados para aeropuertos de salida y llegada
  const departureIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/149/149060.png', // Ícono de salida (puede ser verde)
    iconSize: [30, 30],
  });

  const arrivalIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/149/149059.png', // Ícono de llegada (puede ser rojo)
    iconSize: [30, 30],
  });

  return (
    <MapContainer center={position} zoom={3} style={{ height: '100vh', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Marcadores de aeropuertos de salida */}
      {flights.map((flight) => (
        <Marker
          key={flight.id + '-departure'}
          position={[flight.departure.location.lat, flight.departure.location.long]}
          icon={departureIcon}
        >
          <Popup>
            <div>
              <strong>Aeropuerto de Salida: {flight.departure.name}</strong><br />
              Ciudad: {flight.departure.city.name}<br />
              País: {flight.departure.city.country.name}
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Marcadores de aeropuertos de llegada */}
      {flights.map((flight) => (
        <Marker
          key={flight.id + '-arrival'}
          position={[flight.destination.location.lat, flight.destination.location.long]}
          icon={arrivalIcon}
        >
          <Popup>
            <div>
              <strong>Aeropuerto de Llegada: {flight.destination.name}</strong><br />
              Ciudad: {flight.destination.city.name}<br />
              País: {flight.destination.city.country.name}
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Aviones en vuelo */}
      {Array.isArray(planes) && planes.map((plane) => (
        <Marker
          key={plane.flight_id}
          position={[plane.position.lat, plane.position.long]}
          icon={planeIcon}
        >
          <Popup>
            <div>
              <strong>Vuelo: {plane.flight_id}</strong><br />
              Aerolínea: {plane.airline.name}<br />
              Capitán: {plane.captain}<br />
              Estado: {plane.status}
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Rutas de vuelos */}
      {flights.map((flight) => (
        <Polyline
          key={flight.id}
          positions={[
            [flight.departure.location.lat, flight.departure.location.long],
            [flight.destination.location.lat, flight.destination.location.long],
          ]}
          color="blue"
        />
      ))}
    </MapContainer>
  );
};

export default MapComponent;
