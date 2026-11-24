// ChatSphere - Express + Socket.IO server
// Preserves your original event names and adds real-time chat + online-user updates.
const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const httpserver = http.createServer(app);
const io = new Server(httpserver);

const PORT = process.env.PORT || 8080;
const onlineUsers = new Map();

app.use(express.static(path.join(__dirname, "public")));
app.get("/health", (_req, res) => res.json({ status: "ok" }));

io.on("connection", (socket) => {
  const requestedName = String(socket.handshake.query.username || "Guest").trim();
  const username = requestedName.slice(0, 24) || "Guest";
  onlineUsers.set(socket.id, username);

  console.log("Active user:", onlineUsers.size);

  // Original backend event: welcome message to this client.
  socket.emit("gyankibaat", "Welcome to the ChatSphere server");

  // Original backend event: notify other connected clients.
  socket.broadcast.emit("join", `${username} joined the chat`);

  // New additive event: keep the online list synchronized.
  io.emit("user-count", {
    count: onlineUsers.size,
    users: Array.from(onlineUsers.values())
  });

  // Original incoming event name retained. It now also broadcasts the message.
  socket.on("kuchbhi", (msg) => {
    const text = String(msg ?? "").trim().slice(0, 2000);
    if (!text) return;

    console.log(`${username}:`, text);
    io.emit("chat-message", {
      id: `${Date.now()}-${socket.id}`,
      text,
      sender: username,
      socketId: socket.id,
      time: new Date().toISOString()
    });
  });

  // Original announcement event retained.
  io.emit("announcement", "Welcome to the community — be kind and keep the conversation flowing.");

  socket.on("disconnect", () => {
    onlineUsers.delete(socket.id);
    console.log("Active user:", onlineUsers.size);
    io.emit("user-count", {
      count: onlineUsers.size,
      users: Array.from(onlineUsers.values())
    });
  });
});

httpserver.listen(PORT, () => {
  console.log(`ChatSphere server started at http://localhost:${PORT}`);
});
