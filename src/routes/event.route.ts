import { Router } from "express";
import { passportAuthenticateJwt } from "../config/passport.config";
import { createEventController, getPublicEventsByUsernameController, getUserEventsController, toggleEventPrivacyController } from "../controllers/event.controller";

const eventRoutes = Router();

eventRoutes.post("/create", passportAuthenticateJwt, createEventController);

eventRoutes.get("/all", passportAuthenticateJwt, getUserEventsController);
eventRoutes.get("/public/:username", getPublicEventsByUsernameController);

eventRoutes.put("/toggle-privacy", passportAuthenticateJwt, toggleEventPrivacyController);

export default eventRoutes;
