import { User } from "../database/entities/user.entity";
import { slugify } from "../utils/helper";
import { AppDataSource } from "../config/database.config";
import { CreateEventDto, EventIdDto, UserNameAndSlugDto } from "../database/dtos/event.dto";
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

export const toggleEventPrivacyService = async (userId: string, eventId: string) => {
  const eventRepository = AppDataSource.getRepository(Event);

  const event = await eventRepository.findOne({
    where: {
      id: eventId,
      user: { id: userId },
    },
  });

  if (!event) {
    throw new NotFoundException("Evento no encontrado.");
  }

  event.isPrivate = !event.isPrivate;

  await eventRepository.save(event);

  return event;
};

export const getPublicEventsByUsernameService = async (username: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.events", "event", "event.isPrivate = :isPrivate", {
      isPrivate: false,
    })
    .where("user.username = :username", { username })
    .select(["user.id", "user.name", "user.username", "user.imageUrl"])
    .addSelect([
      "event.id",
      "event.title",
      "event.description",
      "event.slug",
      "event.duration",
      "event.locationType",
    ])
    .orderBy("event.createdAt", "DESC")
    .getOne();

  if (!user) {
    throw new NotFoundException("User not found");
  }

  return {
    user: {
      name: user.name,
      username: username,
      imageUrl: user.imageUrl,
    },
    events: user.events,
  };
};

export const getPublicEventsByUsernameAndSlugService = async (userNameAndSlugDto: UserNameAndSlugDto) => {
  const { username, slug } = userNameAndSlugDto;

  const eventRepository = AppDataSource.getRepository(Event);
  
  const event = await eventRepository
    .createQueryBuilder("event")
    .leftJoinAndSelect("event.user", "user")
    .where("user.username = :username", { username })
    .andWhere("event.slug = :slug", { slug })
    .andWhere("event.isPrivate = :isPrivate", { isPrivate: false })
    .select([
      "event.id",
      "event.title",
      "event.description",
      "event.slug",
      "event.duration",
      "event.locationType",
    ])
    .addSelect(["user.id", "user.name", "user.username", "user.imageUrl"])
    .getOne();

  return event;
}

export const deleteEventService = async (userId: string, enventId: string) => {
  const eventRepository = AppDataSource.getRepository(Event);

  const event = await eventRepository.findOne({
    where: {
      id: enventId,
      user: { id: userId },
    },
  });

  if (!event) {
    throw new NotFoundException("Evento no encontrado.");
  }

  await eventRepository.remove(event);

  return { success: true }
}
