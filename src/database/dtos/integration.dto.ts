import { IsEnum, IsNotEmpty } from "class-validator";
import { IntegrationAppTypeEnum } from "../entities/integration.entity";

export class AppTypeDTO {
  @IsEnum(IntegrationAppTypeEnum, { message: "El AppType es incorrecto" })
  @IsNotEmpty({ message: "El AppType es obligatorio" })
  appType: IntegrationAppTypeEnum;
}
