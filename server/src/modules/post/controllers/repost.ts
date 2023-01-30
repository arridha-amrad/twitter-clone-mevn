import { Request, Response } from "express";
import prisma from "@/utils/prisma";
const repost = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const userId = req.app.locals.userId;
  try {
    const post = await prisma.post.findFirst({ where: { id: postId } });
    if (!post) return res.sendStatus(404);

    const isRepost = await prisma.repost.findFirst({
      where: {
        postId,
        userId,
      },
    });
    if (!isRepost) {
      await prisma.repost.create({
        data: {
          postId,
          userId,
        },
      });
    } else {
      await prisma.repost.delete({
        where: {
          id: isRepost.id,
        },
      });
    }
    return res.status(200).json({ message: "reposted" });
  } catch (err) {
    return res.sendStatus(500);
  }
};

export default repost;
