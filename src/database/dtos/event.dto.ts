import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
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
