import { Router } from "express";
import { passportAuthenticateJwt } from "../config/passport.config";
import { getUserAvailabilityController } from "../controllers/availability.controller";

const availabilityRoutes = Router();

availabilityRoutes.get("/me", passportAuthenticateJwt, getUserAvailabilityController);

export default availabilityRoutes;
