import { Request, Response } from "express";
import prisma from "@/utils/prisma";
import { verifyToken } from "@/utils/jwt";
import {
  AUTHOR_SELECTED_DATA,
  getPostData,
  getTweetData,
} from "../tweet.constants";

const getPosts = async (req: Request, res: Response) => {
  const { limit = "0", skip = "0" } = req.query as {
    limit: string;
    skip: string;
  };
  try {
    const bearerAuthToken = req.headers["authorization"];
    let authenticatedUserId = "";
    if (typeof bearerAuthToken === "string") {
      const [type, token] = bearerAuthToken.split(" ");
      if (type === "Bearer") {
        const { userId } = await verifyToken(token, "AccessToken");
        authenticatedUserId = userId;
      }
    }
    const tweets = await prisma.tweet.findMany({
      orderBy: { createdAt: "desc" },
      take: parseInt(limit),
      skip: parseInt(skip),
      include: getTweetData(authenticatedUserId),
    });
    return res.status(200).json({ tweets });
  } catch (err) {
    console.log("err : ", err);
    return res.status(500).send("Server Error");
  } finally {
    await prisma.$disconnect();
  }
};

export default getPosts;
