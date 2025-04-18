import "dotenv/config";
import cors from "cors";
import express from "express";
import authRoutes from "./routes/auth.route";
import { config } from "./config/app.config";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { initializeDatabase } from "./database/database";

const app = express();
const BASE_PATH = config.BASE_PATH;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: config.FRONTEND_ORIGIN,
    credentials: true,
  })
);

app.use(`${BASE_PATH}/auth`, authRoutes);

app.use(errorHandler);

app.listen(config.PORT, async () => {
  await initializeDatabase();
  console.log(`Servidor iniciado en el puerto ${config.PORT} en ${config.NODE_ENV}`);
});
