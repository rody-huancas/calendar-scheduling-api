import { Request, Response } from "express";
import { HTTPSTATUS } from "../config/http.cofig";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { CreateEventDto } from "../database/dtos/event.dto";
import { asyncHandlerAndValidate } from "../middlewares/withValidation.middleware";
import { createEventService, getEventsService } from "../services/event.service";

export const createEventController = asyncHandlerAndValidate(
  CreateEventDto,
  "body",
  async (req: Request, res: Response, createEventDto) => {
    const userId = req.user?.id as string;

    const event = await createEventService(userId, createEventDto);

    return res.status(HTTPSTATUS.CREATED).json({
      message: "Evento creado correctamente.",
      event
    });
  }
);


export const getUserEventsController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.id as string;
    const { events, username } = await getEventsService(userId);

    return res.status(HTTPSTATUS.OK).json({
      message: "Eventos obtenidos correctamente.",
      data: {
        events,
        username,
      },
    });
  }
);