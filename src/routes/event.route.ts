import { Router } from "express";
import { passportAuthenticateJwt } from "../config/passport.config";
import { createEventController, getUserEventsController } from "../controllers/event.controller";

const eventRoutes = Router();

eventRoutes.post("/create", passportAuthenticateJwt, createEventController);
eventRoutes.get("/all", passportAuthenticateJwt, getUserEventsController);

export default eventRoutes;
