import express from "express";
import path from "path";

import dotenv from "dotenv";
import authRoutes from "./routers/auth.router.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import cookieParser from "cookie-parser";
import messageRoutes from "./routers/message.router.js";
import userRoutes from "./routers/user.router.js";
import { app , server } from "./socket/socket.js";

//const app = express();

const PORT = process.env.PORT || 5000;
dotenv.config();
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get((req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});




server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on http://localhost:${PORT}`);
});
