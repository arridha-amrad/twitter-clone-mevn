import { Request, Response } from "express";
import prisma from "@/utils/prisma";
import { POST_INCLUDED_DATA } from "../post.constants";
import { getPostParents } from "../utils/getPostParents";
import { IPostWithParents } from "../post.types";

const createComment = async (req: Request, res: Response) => {
  const { body, postId } = req.body;
  try {
    const userId = req.app.locals.userId;
    const parentPost = await prisma.post.findFirst({ where: { id: postId } });
    if (!parentPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    const newPost = await prisma.post.create({
      include: POST_INCLUDED_DATA,
      data: {
        parentId: postId,
        authorId: userId,
        body,
        createdAt: new Date(),
      },
    });
    const parents = await getPostParents(postId, userId, []);
    const comment: IPostWithParents = {
      ...newPost,
      isLiked: false,
      parents,
      medias: [],
    };
    return res.status(201).json({ comment });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error");
  } finally {
    await prisma.$disconnect();
  }
};

export default createComment;
