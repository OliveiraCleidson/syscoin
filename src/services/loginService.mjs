import { getUser } from "../data/dataContext.mjs";

export class LoginService {
  constructor(validator) {
    this.validator = validator;
  }

  async login(data) {
    const isValidResponse = await this.validator.execute(data);

    if (!isValidResponse.success) return isValidResponse;

    const user = getUser(data.user);

    if (!user || data.password !== user.password)
      return {
        success: false,
        message: "Credenciais erradas.",
      };

    return {
      success: true,
      message: "Meu nome completo é Oliver. Eu quero essa vaga!",
    };
  }
}
