import { Request, Response } from "express";
import { HTTPSTATUS } from "../config/http.cofig";
import { AppTypeDTO } from "../database/dtos/integration.dto";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { asyncHandlerAndValidate } from "../middlewares/withValidation.middleware";
import { checkIntegrationService, connectAppService, getUserIntegrationsService } from "../services/integrations.service";

export const getUserIntegrationsController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.id as string;
    const integrations = await getUserIntegrationsService(userId);

    res.status(HTTPSTATUS.OK).json({
      meesage: "La integración se ha realizado correctamente",
      integrations,
    });
  }
);

export const checkIntegrationController = asyncHandlerAndValidate(
  AppTypeDTO,
  "params",
  async (req: Request, res: Response, appTypeDto) => {
    const userId = req.user?.id as string;

    const isConnected = await checkIntegrationService(
      userId,
      appTypeDto.appType
    );

    return res.status(HTTPSTATUS.OK).json({
      message: "Estado de la integración",
      isConnected,
    });
  }
);

export const connectAppController = asyncHandlerAndValidate(
  AppTypeDTO,
  "params",
  async (req: Request, res: Response, appTypeDto) => {
    const userId = req.user?.id as string;

    const { url } = await connectAppService(
      userId,
      appTypeDto.appType
    );

    return res.status(HTTPSTATUS.OK).json({
      url
    });
  }
)