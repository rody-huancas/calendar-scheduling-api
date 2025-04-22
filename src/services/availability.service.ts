import { User } from "../database/entities/user.entity";
import { AppDataSource } from "../config/database.config";
import { NotFoundException } from "../utils/app-error";
import { AvailabilityResponseType } from "../@types/availability.type";

export const getUserAvailabilityService = async (userId: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where    : { id: userId },
    relations: ["availability", "availability.days"],
  });

  if (!user || !user.availability) {
    throw new NotFoundException("Usuario no encontrado o sin disponibilidad");
  }

  const availabilityData: AvailabilityResponseType = {
    timeGap: user.availability.timeGap,
    days   : [],
  };

  user.availability.days.forEach((dayAvailability) => {
    availabilityData.days.push({
      day        : dayAvailability.day,
      startTime  : dayAvailability.startTime.toISOString().slice(11, 16),
      endTime    : dayAvailability.endTime.toISOString().slice(11, 16),
      isAvailable: dayAvailability.isAvailable,
    });
  });

  return availabilityData;
};
