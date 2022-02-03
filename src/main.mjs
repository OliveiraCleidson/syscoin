import "dotenv/config";

import { loggerFactory } from "./factories/loggerFactory.mjs";
import { appFactory } from "./factories/appFactory.mjs";

const logger = loggerFactory();
const app = appFactory(logger);

const port = process.env.PORT || 5009;

app.listen(port, () => {
  logger.info(`Aplicativo iniciado na porta ${port}`);
});
