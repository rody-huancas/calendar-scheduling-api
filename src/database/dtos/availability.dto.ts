import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { DayOfWeekEnum } from "../entities/day-availability.entity";

export class DayAvailabilityDto {
  @IsEnum(DayOfWeekEnum, {  message: "El día de la semana no es válido" })
  @IsNotEmpty({ message: "El día de la semana es obligatorio" })
  day: DayOfWeekEnum;

  @IsString()
  @IsNotEmpty({  message: "La hora de inicio es obligatoria" })
  startTime: string;

  @IsString()
  @IsNotEmpty({  message: "La hora de fin es obligatoria" })
  endTime: string;

  @IsBoolean({ message: "La disponibilidad debe ser un valor booleano" })
  @IsNotEmpty({ message: "La disponibilidad es obligatoria" })
  isAvailable: boolean;
}

export class UpdateAvailabilityDto {
  @IsNumber({}, { message: "El intervalo de tiempo debe ser un número" })
  @IsNotEmpty({ message: "El intervalo de tiempo es obligatorio" })
  timeGap: number;

  @IsArray({ message: "Los días de disponibilidad deben ser un arreglo" })
  @ValidateNested({ each: true })
  @Type(() => DayAvailabilityDto)
  days: DayAvailabilityDto[];
}
