import type { NextApiRequest, NextApiResponse } from "next";
// lib
import { hashPassword, setJWTCookie, signJWT } from "@/lib/auth";
import { db } from "@/lib/db";
// types
import type { User } from ".prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password, firstName, lastName } = req.body as User;

    if (!email) {
      return null;
    }

    const createdUser = await db.user.create({
      data: {
        email,
        password: hashPassword(password),
        firstName,
        lastName,
      },
    });

    const jwt = await signJWT(createdUser);

    setJWTCookie(res, jwt);

    res.statusCode = 201;
    res.end();
    return;
  }

  res.statusCode = 405;
  res.end();
}
