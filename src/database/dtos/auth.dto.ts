import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class RegisterDto {
  @IsNotEmpty({ message: "El nombre es requerido" })
  name: string;

  @IsNotEmpty({ message: "El email es requerido" })
  @IsEmail({}, { message: "El email no es válido" })
  email: string;

  @MinLength(6, { message: "La contraseña debe tener al menos 6 caracteres" })
  @IsNotEmpty({ message: "La contraseña es requerida" })
  password: string;
}

export class LoginDto {
  @IsNotEmpty({ message: "El email es requerido" })
  @IsEmail({}, { message: "El email no es válido" })
  email: string;

  @MinLength(6, { message: "La contraseña debe tener al menos 6 caracteres" })
  @IsNotEmpty({ message: "La contraseña es requerida" })
  password: string;
}
