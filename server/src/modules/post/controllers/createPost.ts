import { Request, Response } from "express";

import prisma from "@/utils/prisma";
import { POST_INCLUDED_DATA } from "../post.constants";
import { IPostWithParents } from "../post.types";

const createPost = async (req: Request, res: Response) => {
  // const { body }: { body: string } = req.body;
  console.log(req.body);
  console.log(req.files);

  return res.status(200).send("OK");
  // return res.status(200).send("OK");
  // try {
  //   const userId = req.app.locals.userId;
  //   const newPost = await prisma.post.create({
  //     data: {
  //       body,
  //       authorId: userId,
  //     },
  //     include: POST_INCLUDED_DATA,
  //   });
  //   const post: IPostWithParents = {
  //     ...newPost,
  //     isLiked: false,
  //     isReposted: false,
  //     parents: [],
  //   };
  //   return res.status(201).json({ post });
  // } catch (err) {
  //   console.log("err : ", err);
  //   return res.sendStatus(500);
  // }
};

export default createPost;
