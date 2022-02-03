import { LoginService } from "../../src/services/loginService.mjs";
import jest from "jest-mock";

describe("LoginService", () => {
  // System Under Test
  let sut;
  let sutRequest;
  let validator;
  beforeEach(() => {
    validator = {
      execute: jest.fn(() => Promise.resolve({ success: true })),
    };
    sut = new LoginService(validator);
    sutRequest = {
      user: "syscoin",
      password: "meEscolhe",
    };
  });

  it("should be logged if user is syscoin and password meEscolhe", async () => {
    const result = await sut.login(sutRequest);

    expect(result).toMatchObject({
      success: true,
    });
  });

  it("should be send message if the login was success", async () => {
    const result = await sut.login(sutRequest);

    expect(result).toMatchObject({
      success: true,
      message: "Meu nome completo é Oliver. Eu quero essa vaga!",
    });
  });

  for (let i = 0; i < 3; i++) {
    const user = Math.random().toString(36).substring(7);
    it(`should be success false if user not syscoin #${i}`, async () => {
      const result = await sut.login({ ...sutRequest, user });

      expect(result).toMatchObject({
        success: false,
      });
    });
  }

  for (let i = 0; i < 3; i++) {
    const password = Math.random().toString(36).substring(7);
    it(`should be success false if password is not correct #${i}`, async () => {
      const result = await sut.login({ ...sutRequest, password });

      expect(result).toMatchObject({
        success: false,
      });
    });
  }

  it("should be send message if user is not correct", async () => {
    const user = Math.random().toString(36).substring(7);
    const result = await sut.login({ ...sutRequest, user });

    expect(result).toMatchObject({
      success: false,
      message: "Credenciais erradas.",
    });
  });

  it("should be send message if password is not correct", async () => {
    const password = Math.random().toString(36).substring(7);
    const result = await sut.login({ ...sutRequest, password });

    expect(result).toMatchObject({
      success: false,
      message: "Credenciais erradas.",
    });
  });

  it("should be call validator", async () => {
    await sut.login(sutRequest);

    expect(validator.execute.mock.calls.length).toBe(1);
  });

  it("should return validator result if success is false", async () => {
    validator.execute = jest.fn(() =>
      Promise.resolve({ success: false, flag: true })
    );
    const result = await sut.login(sutRequest);

    expect(result).toMatchObject({
      success: false,
      flag: true,
    });
  });
});
