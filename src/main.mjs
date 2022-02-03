import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { routes } from "./routes.mjs";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);
app.use(helmet());

app.use(routes);

const port = process.env.PORT || 5009;
app.listen(port, () => {
  console.log(`Aplicativo iniciado na porta ${port}`);
});
