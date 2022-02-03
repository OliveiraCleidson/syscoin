const users = [{ user: "syscoin", password: "meEscolhe" }];

export function getUser(user) {
  return users.find((val) => val.user === user);
}
