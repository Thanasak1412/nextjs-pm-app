import bcrypt from "bcrypt";
// config
import { SALT_ROUND } from "../config";

export function hashPassword(password: string) {
  const salt = bcrypt.genSaltSync(+SALT_ROUND);

  return bcrypt.hashSync(password, salt);
}
