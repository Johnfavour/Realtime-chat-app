const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messagesRoute = require("./routes/messagesRoute");

const app = express();
const socket = require("socket.io");
require("dotenv").config();

app.use(cors(
    {
        origin: ["https://realtime-chat-app.vercel.app"],
        methods: ["POST", "GET"],
        credentials: true
    }
));
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/messages", messagesRoute);


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("DB Connection Successful");
})
.catch((err) => {
    console.log(err.message);
});

const server = app.listen(process.env.PORT, () => {
    console.log(`Server Started on Port ${process.env.PORT}`);
});

const io = socket(server, {
    cors:{
        origin: "http://localhost:5173",
        credential: true,
    }
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    console.log("user just connected")

    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });
    socket.on("send-msg", (data)=> {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-received", data.message);
        }
    })
});

