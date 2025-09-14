import express from 'express';
import dotenv from "dotenv";
import authRoutes from "./routers/auth.router.js";
import connectToMongoDB from './db/connectToMongoDB.js';
import cookieParser from "cookie-parser";
import messageRoutes from "./routers/message.router.js";
import userRoutes from "./routers/user.router.js";

dotenv.config();
//const __dirname = path.resolve();

const app = express();
app.use(cookieParser());


const PORT = process.env.PORT || 5000; 

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);


app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on http://localhost:${PORT}`);
});
