import { Router } from "express";
import { LoginService } from "./services/loginService.mjs";
import { userValidator } from "./validators/userValidator.mjs";
import { v4 } from "uuid";

const routesFactory = (logger) => {
  const routes = Router();

  const loginService = new LoginService(
    {
      execute: userValidator,
    },
    logger
  );

  const loggerMiddleware = async (req, res, next) => {
    const _idRequest = v4();
    req._id = _idRequest;
    logger.info(`${_idRequest} - Iniciando requisição`);
    req.logger = logger;

    res.on("finish", () => {
      if (res.statusCode >= 400) {
        req.logger.error(
          `${_idRequest} - Requisição Finalizada ${res.statusCode}`
        );
      } else
        req.logger.info(
          `${_idRequest} - Requisição Finalizada ${res.statusCode}`
        );
    });

    await next();
  };

  routes.use(loggerMiddleware);

  routes.post("/provasyscoin", async (req, res) => {
    const id = req._id;
    logger.info(`${id} - [POST] /provasyscoin`);
    const data = req.query;
    data._idRequest = id;

    const result = await loginService.login(data);

    return res.status(result.success ? 200 : 400).json(result);
  });

  routes.get("/", (req, res) => {
    res.status(200).json({
      message: "Hello World",
    });
  });

  routes.get("*", (req, res) => {
    return res.status(404).json({ message: "Página não encontrada" });
  });

  return routes;
};

export { routesFactory as routes };
