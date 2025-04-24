import { Request, Response } from "express";
import { HTTPSTATUS } from "../config/http.cofig";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { UpdateAvailabilityDto } from "../database/dtos/availability.dto";
import { asyncHandlerAndValidate } from "../middlewares/withValidation.middleware";
import { getAvailabilityForPublicEventService, getUserAvailabilityService, updateAvailabilityService } from "../services/availability.service";
import { EventIdDto } from '../database/dtos/event.dto';

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

// para eventos públicos
export const getAvailabilityForPublicEventController = asyncHandlerAndValidate(
  EventIdDto,
  "params",
  async (req: Request, res: Response, eventIdDto) => {
    const availability = await getAvailabilityForPublicEventService(
      eventIdDto.eventId
    );
    return res.status(HTTPSTATUS.OK).json({
      message: "Event availability fetched successfully",
      data: availability,
    });
  }
);