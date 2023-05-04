import { Request, Response } from "express";
import prisma from "@/utils/prisma";
import { saveFiles } from "../services/filesServices";
import { getTweetData } from "../tweet.constants";

const createReply = async (req: Request, res: Response) => {
  const { description, tweetId } = req.body;
  const authenticatedUserId = req.app.locals.userId;
  const files = req.files?.files;
  try {
    const parentTweet = await prisma.tweet.findFirst({
      where: { id: tweetId },
    });

    if (!parentTweet) {
      return res.status(404).json({ message: "Tweet not found" });
    }

    const newPost = await prisma.post.create({
      data: {
        body: description,
        authorId: authenticatedUserId,
      },
    });

    if (files) {
      await saveFiles(newPost.id, files);
    }

    const newTweet = await prisma.tweet.create({
      data: {
        postId: newPost.id,
        userId: authenticatedUserId,
        parentId: parentTweet.id,
      },
      include: getTweetData(authenticatedUserId),
    });

    // const parentPost = await prisma.post.findFirst({ where: { id: postId } });
    // if (!parentPost) {
    //   return res.status(404).json({ error: "Post not found" });
    // }
    // const newPost = await prisma.post.create({
    //   include: POST_INCLUDED_DATA,
    //   data: {
    //     parentId: postId,
    //     authorId: userId,
    //     body,
    //     createdAt: new Date(),
    //   },
    // });
    // const parents = await getPostParents(postId, userId);
    // const comment: IPostWithParents = {
    //   ...newPost,
    //   isLiked: false,
    //   isRetweet: false,
    //   parents,
    //   medias: [],
    // };
    // const newTweet = await createTweet(false, newPost.id, userId);
    // const tweet: ITweet = { ...newTweet, post: comment };
    return res.status(201).json({ reply: newTweet });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error");
  } finally {
    await prisma.$disconnect();
  }
};

export default createReply;
