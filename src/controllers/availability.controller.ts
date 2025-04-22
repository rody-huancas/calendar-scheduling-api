import { Request, Response } from "express";
import { HTTPSTATUS } from "../config/http.cofig";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { UpdateAvailabilityDto } from "../database/dtos/availability.dto";
import { asyncHandlerAndValidate } from "../middlewares/withValidation.middleware";
import { getUserAvailabilityService, updateAvailabilityService } from "../services/availability.service";

export const getUserAvailabilityController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.id as string;

    const availability = await getUserAvailabilityService(userId);

    return res.status(HTTPSTATUS.OK).json({
      message: "Disponibilidad comprobada con éxito",
      availability,
    });
  }
);

export const updateAvailabilityController = asyncHandlerAndValidate(
  UpdateAvailabilityDto,
  "body",
  async (req: Request, res: Response, updateAvailabilityDto) => {
    const userId = req.user?.id as string;

    await updateAvailabilityService(userId, updateAvailabilityDto);

    return res.status(HTTPSTATUS.OK).json({
      message: "Disponibilidad actualizada con éxito",
    });
  }
);
