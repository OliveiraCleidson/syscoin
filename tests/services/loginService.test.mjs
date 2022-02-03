import { LoginService } from "../../src/services/loginService.mjs";

describe("LoginService", () => {
  // System Under Test
  let sut;
  let sutRequest;
  beforeEach(() => {
    sut = new LoginService();
    sutRequest = {
      user: "syscoin",
      password: "meEscolhe",
    };
  });

  it("should be logged if user is syscoin and password meEscolhe", () => {
    const result = sut.login(sutRequest);

    expect(result).toMatchObject({
      success: true,
    });
  });

  it("should be send message if the login was success", () => {
    const result = sut.login(sutRequest);

    expect(result).toMatchObject({
      success: true,
      message: "Meu nome completo é Oliver. Eu quero essa vaga!",
    });
  });

  for (let i = 0; i < 3; i++) {
    const user = Math.random().toString(36).substring(7);
    it(`should be success false if user not syscoin #${i}`, () => {
      const result = sut.login({ ...sutRequest, user });

      expect(result).toMatchObject({
        success: false,
      });
    });
  }

  for (let i = 0; i < 3; i++) {
    const password = Math.random().toString(36).substring(7);
    it(`should be success false if password is not correct #${i}`, () => {
      const result = sut.login({ ...sutRequest, password });

      expect(result).toMatchObject({
        success: false,
      });
    });
  }

  it("should be send message if user is not correct", () => {
    const user = Math.random().toString(36).substring(7);
    const result = sut.login({ ...sutRequest, user });

    expect(result).toMatchObject({
      success: false,
      message: "Credenciais erradas.",
    });
  });

  it("should be send message if password is not correct", () => {
    const password = Math.random().toString(36).substring(7);
    const result = sut.login({ ...sutRequest, password });

    expect(result).toMatchObject({
      success: false,
      message: "Credenciais erradas.",
    });
  });
});
