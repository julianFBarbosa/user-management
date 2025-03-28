import cors from "cors";
import express, { json, urlencoded } from "express";
import { pino } from "pino";

import { env } from "@/common/utils/envConfig";
import { useExpressServer } from 'routing-controllers';
import { UserController } from './api/user/userController';
import { HttpErrorHandler } from "./common/middleware/errorHandler";

const logger = pino({ name: "server start" });

const app = express();

app.use(json())
app.use(urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }))

useExpressServer(app, {
    routePrefix: '/api',
    controllers: [UserController],
    middlewares: [HttpErrorHandler],
});

app.set("trust proxy", true);

export { app, logger };
