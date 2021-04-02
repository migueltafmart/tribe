require("cors")({ origin: "http://localhost:3000" });
const express = require("express"),
  app = express(),
  httpServer = require("http").createServer(app),
  path = require("path"),
  routes = require("./controllers/routes"),
  io = require("socket.io")(httpServer),
  dotenv = require("dotenv"),
  cors = require("cors"),
  cookieParser = require("cookie-parser");
dotenv.config();

const PORT = process.env.PORT || 8080;
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000", optionsSuccessStatus: 200 }));
app.use(express.json());
app.use("/", express.static("./public/"));
//* Routes
app.use(routes);
//* Send index.html file after build
/* app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
}); */
//* Socket.io
io.on("connection", (socket) => {
  console.log(
    "user connected using socket:",
    socket.id,
    "total:",
    io.engine.clientsCount
  );
  socket.on("chat message", (msg) => {
    console.log("user sent a message", msg);
    socket.broadcast.emit("chat message", msg);
  });
  socket.on("private message", (msg, socketId) => {
    socket.broadcast.to(socketId).emit("private message", msg);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
    //!Delete all messages from database exept for the 10 most recent
  });
});
httpServer.listen(PORT, () => console.log("Server running at " + PORT));
