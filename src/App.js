import React, { useState, useEffect } from 'react';
import { connectWebSocket, sendMessage } from './utils/websocket';
import MapComponent from './components/Map';
import FlightTable from './components/FlightTable';
import Chat from './components/Chat';
import Notification from './components/Notification';

const App = () => {
  const [flights, setFlights] = useState([]);
  const [planes, setPlanes] = useState([]);
  const [messages, setMessages] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    connectWebSocket(
      setFlights,
      (plane) => {
        setPlanes((prevPlanes) => {
          const updatedPlanes = prevPlanes.filter(p => p.flight_id !== plane.flight_id && p.status !== "arrived");
          return [...updatedPlanes, plane];
        });
      },
      (msg) => setMessages((prev) => [...prev, msg]),
      (eventType, flightId) => {
        if (eventType === 'take-off') {
          setNotification(`El vuelo ${flightId} ha despegado.`);
        } else if (eventType === 'landing') {
          setNotification(`El vuelo ${flightId} ha aterrizado.`);
        } else if (eventType === 'crashed') {
          setNotification(`El vuelo ${flightId} ha sufrido un accidente.`);
        }
        setTimeout(() => setNotification(null), 5000);
      }
    );
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col items-center p-4">
      <header className="bg-blue-600 w-full p-4 text-white text-center text-2xl font-bold">
        Flight Tracker
      </header>

      {/* Disposición en columna con espacio entre componentes */}
      <div className="w-full max-w-4xl flex flex-col gap-4 mt-4">
        <div className="relative w-full h-[50vh] bg-white shadow-lg rounded-md overflow-hidden">
          <MapComponent flights={flights} planes={planes} />
        </div>

        {/* Aquí movemos el componente de notificación fuera del mapa */}
        {notification && <Notification message={notification} />}

        <div className="w-full bg-white p-4 shadow-lg rounded-md">
          <FlightTable flights={flights} />
        </div>

        <div className="w-full bg-white p-4 shadow-lg rounded-md">
          <Chat messages={messages} onSendMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
};

export default App;
