import type { NextApiRequest, NextApiResponse } from "next";
import { comparePassword, setJWTCookie, signJWT } from "@/lib/auth";
import { db } from "@/lib/db";
import { User } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body as Pick<User, "email" | "password">;

    if (!email) {
      res.statusCode = 400;
      res.end();
      return;
    }

    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user?.id) {
      res.status(400).json({
        status: false,
        message: "User not found",
      });

      return;
    }

    const hasUser = comparePassword(password, user?.password as string);

    if (!hasUser) {
      res.status(400).json({
        status: false,
        message: "Password is incorrect",
      });

      return;
    }

    const jwt = await signJWT(user as Pick<User, "id" | "email">);

    setJWTCookie(res, jwt);

    res.statusCode = 201;
    res.end();

    return;
  }

  res.statusCode = 405;
  res.end();
}
