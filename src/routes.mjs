import { Router } from "express";
import { LoginService } from "./services/loginService.mjs";
import { userValidator } from "./validators/userValidator.mjs";

const routes = Router();

const loginService = new LoginService({
  execute: userValidator,
});

routes.post("/provasyscoin", async (req, res) => {
  const data = req.query;
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

export { routes };
