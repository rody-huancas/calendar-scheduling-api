import { User } from "../database/entities/user.entity";
import { slugify } from "../utils/helper";
import { AppDataSource } from "../config/database.config";
import { CreateEventDto } from "../database/dtos/event.dto";
import { NotFoundException } from "../utils/app-error";
import { Event, EventLocationEnumType } from "../database/entities/event.entity";

export const createEventService = async (userId: string, createEventDto: CreateEventDto) => {
  const eventRepository = AppDataSource.getRepository(Event);

  if (!Object.values(EventLocationEnumType)?.includes(createEventDto.locationType)) {
    throw new Error("Tipo de ubicación no válido.");
  }

  const slug = slugify(createEventDto.title);

  const event = eventRepository.create({
    ...createEventDto,
    slug,
    user: { id: userId },
  });

  await eventRepository.save(event);

  return event;
};

export const getEventsService = async (userId: string) => {
  const eventRepository = AppDataSource.getRepository(User);

  const user = await eventRepository
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.events", "events")
    .loadRelationCountAndMap("events._count.meetings", "events.meetings")
    .where("user.id = :userId", { userId })
    .orderBy("events.createdAt", "DESC")
    .getOne();

  if (!user) {
    throw new NotFoundException("Usuario no encontrado.");
  }

  return {
    events: user.events,
    username: user.username,
  };
};
