import express from "express";
import { defaultRoute } from "./default";
import { locationRoute } from "./location";
import { weatherRouter } from "./weather";

export const routes = express.Router();

routes.use(defaultRoute, locationRoute, weatherRouter);
