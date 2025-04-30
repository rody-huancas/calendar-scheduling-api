import { Request, Response } from "express";
import { HTTPSTATUS } from "../config/http.cofig";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { getUserIntegrationsService } from "../services/integrations.service";

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
