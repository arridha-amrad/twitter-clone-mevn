import { Request, Response } from "express";
import prisma from "@/utils/prisma";
import { POST_INCLUDED_DATA } from "../post.constants";

const getPostChildren = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const userId = req.app.locals.userId;
  try {
    const children = await prisma.post.findMany({
      where: {
        parentId: postId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: { ...POST_INCLUDED_DATA },
    });
    for (const post of children) {
      const liked = await prisma.like.findFirst({
        where: {
          postId: post.id,
          userId,
        },
      });
      // @ts-ignore
      post.isLiked = !!liked;
    }
    return res.status(200).json({ children });
  } catch (err) {
    console.log("err : ", err);
    return res.sendStatus(500);
  }
};

export default getPostChildren;
