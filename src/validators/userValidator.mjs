import yup from "yup";

const userSchema = yup.object().shape({
  user: yup.string().required("O campo ${path} é obrigatório"),
  password: yup.string().required("O campo ${path} é obrigatório"),
});

async function validateUser(user) {
  try {
    const parsedUser = userSchema.cast(user);
    const result = await userSchema.validate(parsedUser, { abortEarly: false });
    return {
      success: true,
      data: result,
    };
  } catch (err) {
    return {
      success: false,
      errors: err?.errors,
    };
  }
}

export { validateUser };
