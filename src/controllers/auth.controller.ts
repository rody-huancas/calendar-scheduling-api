import { Request, Response } from "express";
import { HTTPSTATUS } from "../config/http.cofig";
import { RegisterDto } from "../database/dtos/auth.dto";
import { registerService } from "../services/auth.service";
import { asyncHandlerAndValidate } from "../middlewares/withValidation.middleware";

export const registerController = asyncHandlerAndValidate(
  RegisterDto,
  "body",
  async (req: Request, res: Response, RegisterDto) => {
    const { user } = await registerService(RegisterDto)
    
    return res.status(HTTPSTATUS.CREATED).json({
      message: "Usuario registrado correctamente.",
      user
    });
  }
);
