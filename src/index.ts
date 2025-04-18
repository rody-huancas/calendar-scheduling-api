import "dotenv/config";
import "./config/passport.config"
import cors from "cors";
import express from "express";
import passport from "passport";
import authRoutes from "./routes/auth.route";
import eventRoutes from "./routes/event.route";
import { config } from "./config/app.config";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { initializeDatabase } from "./database/database";

const app = express();
const BASE_PATH = config.BASE_PATH;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize())

app.use(
  cors({
    origin: config.FRONTEND_ORIGIN,
    credentials: true,
  })
);

app.use(`${BASE_PATH}/auth`, authRoutes);
app.use(`${BASE_PATH}/event`, eventRoutes);

app.use(errorHandler);

app.listen(config.PORT, async () => {
  await initializeDatabase();
  console.log(`Servidor iniciado en el puerto ${config.PORT} en ${config.NODE_ENV}`);
});
