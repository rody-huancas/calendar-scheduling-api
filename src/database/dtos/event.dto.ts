import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { EventLocationEnumType } from "../entities/event.entity";

export class CreateEventDto {
  @IsString({ message: "El título del evento es una cadena." })
  @IsNotEmpty({ message: "El título del evento es requerido." })
  title: string;

  @IsOptional()
  @IsString({ message: "La descripción del evento es una cadena." })
  description: string;

  @IsNumber({}, { message: "La duración del evento es un número." })
  @IsNotEmpty({ message: "La duración del evento es requerida." })
  duration: number;

  @IsEnum(EventLocationEnumType, { message: "Tipo de ubicación no válido." })
  @IsNotEmpty({ message: "El tipo de ubicación del evento es requerido." })
  locationType: EventLocationEnumType;
}

export class EventIdDto {
  @IsUUID(4, { message: "El ID del evento debe ser un UUID válido." })
  @IsNotEmpty({ message: "El ID del evento es requerido." })
  eventId: string;
}

export class UserNameDto {
  @IsString({ message: "El nombre de usuario es una cadena." })
  @IsNotEmpty({ message: "El nombre de usuario es requerido." })
  username: string;
}

export class UserNameAndSlugDto {
  @IsString({ message: "El nombre de usuario es una cadena." })
  @IsNotEmpty({ message: "El nombre de usuario es requerido." })
  username: string;

  @IsString({ message: "El slug es una cadena." })
  @IsNotEmpty({ message: "El slug es requerido." })
  slug: string;
}
