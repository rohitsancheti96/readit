import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import morgan from "morgan";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

dotenv.config()

import authRoute from "./routes/auth"
import postRoute from "./routes/posts"

import trim from "./middleware/trim";

const app = express();
const PORT = process.env.PORT || 6000;

app.use(express.json());
app.use(morgan("dev"));
app.use(trim)
app.use(cookieParser());

app.get("/", (req, res) => res.send("Hello World"));
app.use('/api/auth', authRoute);
app.use('/api/post', postRoute);

app.listen(PORT, async () => {
    console.log(`Server running at port: ${PORT}`);

    try {
        createConnection();
        console.log("Database Connected");
    } catch (err) {
        console.log("Error connecting Database: ", err);
    }
});
