require("cors")({
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
});
const express = require("express"),
  app = express(),
  httpServer = require("http").createServer(app),
  path = require("path"),
  routes = require("./controllers/routes"),
  io = require("socket.io")(httpServer),
  dotenv = require("dotenv"),
  morgan = require("morgan"),
  chalk = require("chalk"),
  db = require("./model/db"),
  cookieParser = require("cookie-parser");
dotenv.config();

const PORT = process.env.PORT || 8080;

app.use(
  morgan((tokens, req, res) => {
    return [
      chalk.hex("#34ace0").bold(tokens.method(req, res)),
      chalk.hex("#ffb142").bold(tokens.status(req, res)),
      chalk.hex("#ff5252").bold(tokens.url(req, res)),
      chalk.hex("#2ed573").bold(tokens["response-time"](req, res) + " ms"),
    ].join(" ");
  })
);
app.use(cookieParser());
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
  socket.on("self connected", async (user) => {
  //* Update the database with the info coming from the client
  console.log("User connected:", user)
   let res = await db.updateUser("socket", { socket: socket.id, _id: user._id });
  //*Get all users nearby
  //let nearby = await db.getUsersNearBy()
    console.log(res);
  });
  socket.on("nearby", (payload) => {
    
  }
  )

  socket.broadcast.emit("user connected", socket.id);
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
