import { NextApiRequest, NextApiResponse } from "next";

import { COOKIE_NAME } from "@/config";
import { verifyJWT } from "@/lib/auth";
import { db } from "@/lib/db";

interface ApiRequest extends NextApiRequest {
  body: {
    name: string;
  };
}

export default async function handler(req: ApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const jwt = req.cookies[COOKIE_NAME] as string;
    const user = await verifyJWT(jwt);

    if (!user) {
      res.status(401).json({
        status: false,
        message: "Unauthorized",
      });

      return;
    }

    await db.project.create({
      data: {
        name: req.body.name,
        ownerId: user.id,
      },
    });

    res.status(201).json({
      data: {
        message: "Create new project successful",
      },
    });
  }
}
