import  cors from 'cors';
import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth";
import favoritesRoutes from "./routes/favorites";
import notesRoutes from "./routes/notes";
import { connectDB } from "./db/mongoose";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/api/favorites", favoritesRoutes);
app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
});
