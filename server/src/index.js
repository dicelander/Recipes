import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { userRouter } from "./routes/users.js";
const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

app.use('/auth', userRouter);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`SERVER RUNNING ON PORT ${PORT}`)))
    .catch((error) => console.log(error));
