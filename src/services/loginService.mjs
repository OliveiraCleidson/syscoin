import { getUser } from "../data/dataContext.mjs";

export class LoginService {
  login(data) {
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
