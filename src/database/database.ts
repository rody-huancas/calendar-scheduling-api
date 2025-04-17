import { AppDataSource } from "../config/database.config";

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Base de datos conectado correctamente");
  } catch (error) {
    console.log("Error en la conexión de la base de datos");
    process.exit(1);
  }
};
