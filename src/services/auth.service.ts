import { v4 as uuidv4 } from "uuid";
import { User } from "../database/entities/user.entity";
import { Availability } from "../database/entities/availability.entity";
import { AppDataSource } from "../config/database.config";
import { BadRequestException, UnauthorizedException } from "../utils/app-error";
import { LoginDto, RegisterDto } from "../database/dtos/auth.dto";
import { DayAvailability, DayOfWeekEnum } from "../database/entities/day-availability.entity";
import { signJwtToken } from "../utils/jwt";

export const registerService = async (registerDto: RegisterDto) => {
  const userRepository = AppDataSource.getRepository(User);
  const availabilityRepository = AppDataSource.getRepository(Availability);
  const dayAvailabilityRepository =
    AppDataSource.getRepository(DayAvailability);

  const existingUser = await userRepository.findOne({
    where: { email: registerDto.email },
  });

  if (existingUser) {
    throw new BadRequestException("El usuario ya existe");
  }

  const username = await generateUsername(registerDto.name);

  const user = userRepository.create({ ...registerDto, username });

  const availability = availabilityRepository.create({
    timeGap: 30,
    days: Object.values(DayOfWeekEnum).map((day) => {
      return dayAvailabilityRepository.create({
        day,
        startTime: new Date("2025-04-01T09:00:00Z"), // 9:00 am
        endTime: new Date("2025-04-01T17:00:00Z"), // 5:00 pm
        isAvailable:
          day !== DayOfWeekEnum.SUNDAY && day !== DayOfWeekEnum.SATURDAY,
      });
    }),
  });

  user.availability = availability;

  await userRepository.save(user);

  return { user: user.omitPassword() };
};

export const loginService = async (loginDto: LoginDto) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({ where: { email: loginDto.email } });

  if (!user) {
    throw new BadRequestException("El usuario no existe");
  }

  const isPasswordValid = await user.comparePassword(loginDto.password);

  if (!isPasswordValid) {
    throw new UnauthorizedException("La contraseña o el E-mail es incorrecta");
  }

  const { token, expiresAt } = signJwtToken({userId: user.id});

  return { user: user.omitPassword(), accessToken: token, expiresAt };
};

async function generateUsername(name: string): Promise<string> {
  const clearName = name.replace(/\s+/g, "").toLowerCase();
  const baseUsername = clearName;
  const uuidSuffix = uuidv4().replace(/\s+/g, "").slice(0, 4);
  const userRepository = AppDataSource.getRepository(User);

  let username = `${baseUsername}${uuidSuffix}`;
  let existingUser = await userRepository.findOne({ where: { username } });

  while (existingUser) {
    username = `${baseUsername}${uuidv4().replace(/\s+/g, "").slice(0, 4)}`;
    existingUser = await userRepository.findOne({ where: { username } });
  }

  return username;
}
