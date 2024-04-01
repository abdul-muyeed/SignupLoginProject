import bcrypt from "bcrypt";

export const hashPassword = (password) => {
  const hash = bcrypt.hashSync(password.toString(), Number(process.env.SALT));

  return hash;
};

export const comparePassword = (password, hash) => {
  const result = bcrypt.compareSync(password.toString(), hash);
  console.log(result, "result", password, " || ", hash);
  return result;
};
