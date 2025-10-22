import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./confiig/db";
import noteRoutes from "./routes/note.routes";
// Create Express app
const app: Application = express();
const PORT = process.env.PORT || 3000;
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true, // allow cookies/auth if needed
  })
);
// Middleware
app.use(cors());
app.use(express.json());
// MongoDB connection
connectDB();

// Routes
app.use("/api/notes", noteRoutes);

// Start server
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
