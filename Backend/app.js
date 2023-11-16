import { config } from "dotenv";
import express from "express";
import indexRoute from "./routes/index.js";
import connectDB from "./data/database.js";
import morgan from "morgan";
import { AppError } from "./utils/error.js";
import cookieParser from "cookie-parser";
import Stripe from "stripe";

config({ path: "./data/config.env" });
export const app = express();

connectDB();
// app.get("/", (res, req) => {
//   console.log("Working");
// });

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

//Middlewares
app.use("/api", indexRoute);

app.use(AppError);
