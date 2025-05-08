import { Router } from "express";
import { passportAuthenticateJwt } from "../config/passport.config";
import { checkIntegrationController, getUserIntegrationsController } from "../controllers/integration.controller";

const integrationRoutes = Router();

integrationRoutes.get("/all", passportAuthenticateJwt, getUserIntegrationsController);
integrationRoutes.get("/check/:appType", passportAuthenticateJwt, checkIntegrationController);

export default integrationRoutes;
