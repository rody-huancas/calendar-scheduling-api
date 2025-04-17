import "dotenv/config";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { config } from "./config/app.config";
import { HTTPSTATUS } from "./config/http.cofig";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { asyncHandler } from "./middlewares/asyncHandler.middleware";
import { initializeDatabase } from "./database/database";
import { BadRequestException } from "./utils/app-error";

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

app.get(
  "/",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    throw new BadRequestException("Error personalizado");
    res.status(HTTPSTATUS.OK).json({
      message: "holi",
    });
  })
);

app.use(errorHandler);

app.listen(config.PORT, async () => {
  await initializeDatabase();
  console.log(`Servidor iniciado en el puerto ${config.PORT} en ${config.NODE_ENV}`);
});
