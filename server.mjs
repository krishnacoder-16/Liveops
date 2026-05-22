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

// ticketId -> { socketId, agentName, timestamp }
const ticketLocks = new Map();

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

  socket.on('ticket:lock', ({ ticketId, agentName }) => {
    console.log(`Lock request from ${agentName} (${socket.id}) for ticket ${ticketId}`);
    
    if (ticketLocks.has(ticketId)) {
      // Reject lock
      const lockInfo = ticketLocks.get(ticketId);
      socket.emit('ticket:lock_failed', {
        ticketId,
        lockedBy: lockInfo.agentName,
        attemptedBy: agentName
      });
      return;
    }

    // Grant lock
    ticketLocks.set(ticketId, {
      socketId: socket.id,
      agentName,
      timestamp: Date.now()
    });

    io.emit('ticket:locked', {
      ticketId,
      lockedBy: agentName,
      lockedBySocketId: socket.id
    });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Socket.IO Server running on port ${PORT}`);
});
