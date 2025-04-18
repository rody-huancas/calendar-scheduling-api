import { Request, Response } from "express";
import { HTTPSTATUS } from "../config/http.cofig";
import { LoginDto, RegisterDto } from "../database/dtos/auth.dto";
import { asyncHandlerAndValidate } from "../middlewares/withValidation.middleware";
import { loginService, registerService } from "../services/auth.service";

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

export const loginController = asyncHandlerAndValidate(
  LoginDto,
  "body",
  async (req: Request, res: Response, LoginDto) => {
    const { user, accessToken, expiresAt } = await loginService(LoginDto);
    
    return res.status(HTTPSTATUS.CREATED).json({
      message: "Inicio de sesión correcto.",
      user,
      accessToken,
      expiresAt
    });
  }
);

