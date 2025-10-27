import express from "express";
import { Application } from "express";
// import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes";
import healthRoutes from "./routes/health.routes";
import examRoutes from "./routes/exam.routes";
// Create the express app and import the type of app from express;

const app: Application = express();
// Cors
app.use(cors());
//configure env;
dotenv.config();
// Parser
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
// Declare The PORT Like This
const PORT: number = 8000;

// Listen the server
app.listen(PORT, async () => {
  console.log(`🗄️ Server Fire on http://localhost:${PORT}/`);
});

app.use("/exams", examRoutes);

app.use("/users", userRoutes);

app.use("/health", healthRoutes);

app.get("/test", (req, res) => {
  const connString = process.env.DATABASE_URL;

  console.log("connString xx", connString);
  res.send("<h1>Welcome To JWT Authentication </h1>");
});
