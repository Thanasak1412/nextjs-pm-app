import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcrypt";
import { RequestCookies } from "next/dist/server/web/spec-extension/cookies";
// types
import { User } from ".prisma/client";
// config
import { COOKIE_NAME, JWT_SECRET, SALT_ROUND } from "../config";
import { db } from "./db";

export function hashPassword(password: string) {
  const salt = bcrypt.genSaltSync(+SALT_ROUND);

  return bcrypt.hashSync(password, salt);
}

export function comparePassword(
  plainTextPassword: string,
  hashedPassword: string
) {
  return bcrypt.compareSync(plainTextPassword, hashedPassword);
}

export function signJWT(user: User) {
  const iat = Math.floor(Date.now() * 1000);
  const exp = iat * 60 * 60 * 24 * 7;

  return new SignJWT({
    payload: {
      id: user.id,
      email: user.email,
    },
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(JWT_SECRET));
}

type Payload = Pick<User, "id" | "email">;
export async function verifyJWT(jwt: string) {
  if (!jwt) {
    return;
  }

  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(JWT_SECRET)
  );

  return payload.payload as Payload;
}

export async function getUserFromCookie(cookies: RequestCookies) {
  const jwt = cookies.get(COOKIE_NAME)?.value;

  if (!jwt) {
    return null;
  }

  const { id } = (await verifyJWT(jwt)) as Payload;

  const user = await db.user.findUnique({
    where: {
      id,
    },
  });

  return user;
}
