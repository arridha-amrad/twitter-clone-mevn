import { Request, Response } from "express";

import prisma from "@/utils/prisma";
import { POST_INCLUDED_DATA } from "../post.constants";

const createPost = async (req: Request, res: Response) => {
  const { body }: { body: string } = req.body;
  try {
    const userId = req.app.locals.userId;
    const newPost = await prisma.post.create({
      data: {
        body,
        authorId: userId,
      },
      include: POST_INCLUDED_DATA,
    });
    const post = { ...newPost, isLiked: false, parents: [] };
    return res.status(201).json({ post });
  } catch (err) {
    console.log("err : ", err);
    return res.sendStatus(500);
  }
};

export default createPost;
