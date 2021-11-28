const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.all('*', (req, res) => {
    return handle(req, res)
  });

  const ws = server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  });

  const io = require("socket.io")(ws);
  
  const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
  
  io.on("connection", (socket) => {
    console.log(`Client ${socket.id} connected`);
  
    // Join a conversation
    const { roomId } = socket.handshake.query;
    socket.join(roomId);
  
    // Listen for new messages
    socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
      io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
    });
  
    // Leave the room if the user closes the socket
    socket.on("disconnect", () => {
      console.log(`Client ${socket.id} diconnected`);
      socket.leave(roomId);
    });
  });
});
