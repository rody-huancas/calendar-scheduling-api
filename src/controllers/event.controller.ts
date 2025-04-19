import { Request, Response } from "express";
import { HTTPSTATUS } from "../config/http.cofig";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { asyncHandlerAndValidate } from "../middlewares/withValidation.middleware";
import { CreateEventDto, EventIdDto, UserNameAndSlugDto, UserNameDto } from "../database/dtos/event.dto";
import {
  createEventService,
  getEventsService,
  getPublicEventsByUsernameAndSlugService,
  getPublicEventsByUsernameService,
  toggleEventPrivacyService,
} from "../services/event.service";

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

export const toggleEventPrivacyController = asyncHandlerAndValidate(
    EventIdDto,
    "body",
    async (req: Request, res: Response, eventIdDto) => {
      const userId = req.user?.id as string;
  
      const event = await toggleEventPrivacyService(userId, eventIdDto.eventId);
  
      return res.status(HTTPSTATUS.OK).json({
        message: `Evento establecido en ${event.isPrivate ? "privado" : "público"} correctamente`
      });
    }
  );

export const getPublicEventsByUsernameController = asyncHandlerAndValidate(
    UserNameDto,
    "params",
    async (req: Request, res: Response, userNameDto) => {
      const { user, events } = await getPublicEventsByUsernameService(userNameDto.username);
  
      return res.status(HTTPSTATUS.OK).json({
        message: "Eventos públicos recuperados correctamente",
        user,
        events
      });
    }
  );

export const getPublicEventsByUsernameAndSlugController = asyncHandlerAndValidate(
    UserNameAndSlugDto,
    "params",
    async (req: Request, res: Response, userNameAndSlugDto) => {
      const event = await getPublicEventsByUsernameAndSlugService(userNameAndSlugDto);
  
      return res.status(HTTPSTATUS.OK).json({
        message: "Detalles del evento recuperados correctamente",
        event
      });
    }
  );
