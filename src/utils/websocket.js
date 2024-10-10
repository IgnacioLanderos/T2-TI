// src/utils/websocket.js

let socket;
let reconnectAttempts = 0;
const maxReconnectAttempts = 5;
const reconnectInterval = 3000; // 3 segundos entre intentos de reconexión

export const connectWebSocket = (onFlightUpdate, onPlaneUpdate, onMessage, onEventNotification) => {
  socket = new WebSocket('wss://tarea-2.2024-2.tallerdeintegracion.cl/connect');

  socket.onopen = () => {
    console.log('Conexión WebSocket establecida');
    reconnectAttempts = 0;

    if (socket.readyState === WebSocket.OPEN) {
      const joinEvent = JSON.stringify({
        type: 'join',
        id: '18638260',
        username: 'Ignacio Landeros',
      });
      socket.send(joinEvent);
    }
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    switch (data.type) {
      case 'flights':
        onFlightUpdate(Object.values(data.flights));
        break;
      case 'plane':
        onPlaneUpdate(data.plane);
        break;
      case 'message':
        onMessage(data.message);
        break;
      case 'take-off':
      case 'landing':
      case 'crashed':
        // Llamar a la función de notificación con el tipo de evento y el id del vuelo
        onEventNotification(data.type, data.flight_id);
        break;
      case 'accepted':
        console.log('Conexión aceptada por el servidor:', data.server_id);
        break;
      default:
        console.warn('Evento desconocido:', data);
    }
  };

  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  socket.onclose = () => {
    console.log('Conexión WebSocket cerrada');
    if (reconnectAttempts < maxReconnectAttempts) {
      reconnectAttempts += 1;
      console.log(`Intentando reconectar... Intento ${reconnectAttempts}`);
      setTimeout(() => {
        connectWebSocket(onFlightUpdate, onPlaneUpdate, onMessage, onEventNotification);
      }, reconnectInterval);
    } else {
      console.warn('No se pudo reconectar después de varios intentos.');
    }
  };
};

export const sendMessage = (message) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    const chatEvent = JSON.stringify({
      type: 'chat',
      content: message,
    });
    socket.send(chatEvent);
  } else {
    console.warn('No se pudo enviar el mensaje, la conexión WebSocket no está lista.');
  }
};
