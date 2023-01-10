import { Request, Response } from "express";
import prisma from "@/utils/prisma";
import { Like } from "@prisma/client";

const likePost = async (req: Request, res: Response) => {
  const { postId } = req.body;

  try {
    const userId = req.app.locals.userId;
    let likePost: Like | null;
    let message: string;
    likePost = await prisma.like.findFirst({
      where: {
        postId,
        userId,
      },
    });
    if (likePost) {
      message = "dislike";
      await prisma.like.delete({
        where: {
          postId_userId: {
            postId,
            userId,
          },
        },
      });
    } else {
      message = "like";
      likePost = await prisma.like.create({
        data: {
          postId,
          userId,
        },
      });
    }
    return res.status(200).json({ message, likePost });
  } catch (err) {
    return res.status(500).send("Server error");
  } finally {
    await prisma.$disconnect();
  }
};

export default likePost;
