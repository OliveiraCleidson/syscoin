import { getUser } from "../data/dataContext.mjs";

export class LoginService {
  constructor(validator, logger) {
    this.validator = validator;
    this.logger = logger;
  }

  async login(data) {
    const isValidResponse = await this.validator.execute(data);

    if (!isValidResponse.success) {
      this.logger.info(`${data._idRequest} - LoginService dados inválidos`);
      return isValidResponse;
    }

    const user = getUser(data.user);

    if (!user || data.password !== user.password) {
      this.logger.info(
        `${data._idRequest} - LoginService usuário ou senha incorretos`
      );

      return {
        success: false,
        message: "Credenciais erradas.",
      };
    }
    this.logger.info(`${data._idRequest} - LoginService dados válidos`);

    return {
      success: true,
      message: "Meu nome completo é Oliver. Eu quero essa vaga!",
    };
  }
}
