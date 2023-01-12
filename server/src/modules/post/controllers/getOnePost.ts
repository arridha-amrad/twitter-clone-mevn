import { Request, Response } from "express";
import prisma from "@/utils/prisma";
import { POST_INCLUDED_DATA } from "../post.constants";
import { IPostWithParents } from "../post.types";

const getOnePost = async (req: Request, res: Response) => {
  const { postId } = req.params;
  try {
    const idUser = req.app.locals.userId;
    const storedPost = await prisma.post.findFirst({
      where: {
        id: postId,
      },
      include: {
        ...POST_INCLUDED_DATA,
        children: {
          orderBy: {
            createdAt: "desc",
          },
          include: POST_INCLUDED_DATA,
        },
      },
    });
    if (!storedPost) return res.status(404).json({ message: "post not found" });
    let isPostLike = false;
    const isLiked = await prisma.like.findFirst({
      where: {
        postId,
        userId: idUser,
      },
    });
    if (isLiked) {
      isPostLike = true;
    }
    // @ts-ignore
    storedPost["isLiked"] = isPostLike;
    for (let currPost of storedPost.children) {
      const like = await prisma.like.findFirst({
        where: {
          postId: currPost.id,
          userId: idUser,
        },
      });
      // @ts-ignore
      currPost["isLiked"] = !!like;
    }
    return res.status(200).json({ post: storedPost });
  } catch (err) {
    console.log("err : ", err);
  } finally {
    await prisma.$disconnect();
  }
};

export default getOnePost;
