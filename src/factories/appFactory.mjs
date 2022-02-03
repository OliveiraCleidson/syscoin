import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";

import { routes } from "../routes.mjs";

export const appFactory = (logger) => {
  const app = express();

  app.use(express.json());

  app.use(
    cors({
      origin: "*",
    })
  );
  app.use(helmet());

  app.use(routes(logger));

  return app;
};
