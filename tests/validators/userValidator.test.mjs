import { validateUser } from "../../src/validators/userValidator.mjs";

describe("UserValidator", () => {
  const sut = validateUser;

  it("should be ok", async () => {
    const request = {
      user: "novas",
      password: "é isto mesmo",
    };

    await expect(sut(request)).resolves.toMatchObject({
      success: true,
      data: request,
    });
  });

  it("should user required", async () => {
    const request = {
      password: "meEscolhe",
    };

    await expect(sut(request)).resolves.toMatchObject({
      success: false,
      errors: ["O campo user é obrigatório"],
    });
  });

  it("should user is not empty", async () => {
    const request = {
      user: "",
      password: "senha",
    };

    await expect(sut(request)).resolves.toMatchObject({
      success: false,
      errors: ["O campo user é obrigatório"],
    });
  });

  it("should password required", async () => {
    const request = {
      user: "novas",
    };

    await expect(sut(request)).resolves.toMatchObject({
      success: false,
      errors: ["O campo password é obrigatório"],
    });
  });

  it("should password is not empty", async () => {
    const request = {
      user: "novas",
      password: "",
    };

    await expect(sut(request)).resolves.toMatchObject({
      success: false,
      errors: ["O campo password é obrigatório"],
    });
  });
});
