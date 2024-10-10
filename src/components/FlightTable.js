import React from 'react';

const FlightTable = ({ flights }) => {
  return (
    <table className="min-w-full border border-gray-200 text-sm text-left">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-2 border-b">ID del Vuelo</th>
          <th className="p-2 border-b">Aeropuerto de Salida</th>
          <th className="p-2 border-b">Ciudad de Salida</th>
          <th className="p-2 border-b">País de Salida</th>
          <th className="p-2 border-b">Coordenadas de Salida</th>
          <th className="p-2 border-b">Aeropuerto de Destino</th>
          <th className="p-2 border-b">Ciudad de Destino</th>
          <th className="p-2 border-b">País de Destino</th>
          <th className="p-2 border-b">Coordenadas de Destino</th>
          <th className="p-2 border-b">Fecha de Salida</th>
        </tr>
      </thead>
      <tbody>
        {flights.map(flight => (
          <tr key={flight.id} className="border-b">
            <td className="p-2">{flight.id}</td>
            <td className="p-2">{flight.departure.name}</td>
            <td className="p-2">{flight.departure.city.name}</td>
            <td className="p-2">{flight.departure.city.country.name}</td>
            <td className="p-2">{`Lat: ${flight.departure.location.lat}, Long: ${flight.departure.location.long}`}</td>
            <td className="p-2">{flight.destination.name}</td>
            <td className="p-2">{flight.destination.city.name}</td>
            <td className="p-2">{flight.destination.city.country.name}</td>
            <td className="p-2">{`Lat: ${flight.destination.location.lat}, Long: ${flight.destination.location.long}`}</td>
            <td className="p-2">{new Date(flight.departure_date).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FlightTable;
