import { ErrorRequestHandler } from "express";
import { AppError } from "../utils/app-error";
import { HTTPSTATUS } from "../config/http.cofig";

export const errorHandler: ErrorRequestHandler = (error, req, res, next): any => {
  console.log(`Error ocurrió en la RUTA: ${req.path}`, error);

  if (error instanceof SyntaxError) {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      message: "Error de sintaxis en el cuerpo de la solicitud.",
      error  : error.message,
    });
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message  : error.message,
      errorCode: error.errorCode,
    });
  }

  return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
    message: "Error interno del servidor",
    error  : error?.message || "Ocurrió un error desconocido.",
  });
};
