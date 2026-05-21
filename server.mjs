import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('ticket:create', (ticket) => {
    console.log('Ticket created:', ticket.id);
    // Broadcast to everyone else
    socket.broadcast.emit('ticket:created', ticket);
  });

  socket.on('ticket:update', (ticket) => {
    console.log('Ticket updated:', ticket.id);
    socket.broadcast.emit('ticket:updated', ticket);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Socket.IO Server running on port ${PORT}`);
});
