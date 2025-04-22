import { Request, Response } from "express";
import { HTTPSTATUS } from "../config/http.cofig";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { getUserAvailabilityService } from "../services/availability.service";

export const getUserAvailabilityController = asyncHandler(
    async (req: Request, res: Response) => {
        const userId = req.user?.id as string;

        const availability = await getUserAvailabilityService(userId);

        return res.status(HTTPSTATUS.OK).json({
            message: "Disponibilidad comprobada con éxito",
            availability
        })
    }
)