import { config } from "dotenv";
import express from "express";
import indexRoute from "./routes/index.js";
import connectDB from "./data/database.js";
import morgan from "morgan";
import { AppError } from "./utils/error.js";
import cookieParser from "cookie-parser";
import cors from "cors";

config({ path: "./data/config.env" });
export const app = express();

connectDB();
// app.get("/", (res, req) => {
//   console.log("Working");
// });

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    methods: ["Get", "POST", "PUT", "DELETE"],
    origin: [process.env.FRONTEND_URI_1, process.env.FRONTEND_URI_2],
  })
);

//Middlewares
app.use("/api", indexRoute);

app.use(AppError);
