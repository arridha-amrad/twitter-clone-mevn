import { upload } from "@/utils/cloudinary";
import prisma from "@/utils/prisma";
import { Media } from "@prisma/client";
import { Request, Response } from "express";
import { POST_INCLUDED_DATA } from "../post.constants";
import { IPostWithParents, ITweet } from "../post.types";
import { createTweet } from "../services/tweetServices";

const createPost = async (req: Request, res: Response) => {
  const postDescription = req.body.text;
  const images = req.files?.images;
  try {
    const userId = req.app.locals.userId;
    const mediaURL: string[] = [];

    if (images) {
      if (images instanceof Array) {
        for (let i = 0; i < images.length; i++) {
          const result = await upload(images[i]);
          mediaURL.push(result.url);
        }
      } else {
        const result = await upload(images);
        mediaURL.push(result.url);
      }
    }

    const newPost = await prisma.post.create({
      data: {
        body: postDescription,
        authorId: userId,
      },
      include: POST_INCLUDED_DATA,
    });

    let newPostMedias: Media[] = [];

    if (mediaURL.length > 0) {
      await prisma.media.createMany({
        data: mediaURL.map((url) => {
          return {
            postId: newPost.id,
            url,
          };
        }),
        skipDuplicates: true,
      });
      const medias = await prisma.media.findMany({
        where: { postId: newPost.id },
      });
      newPostMedias = medias;
    }

    const post: IPostWithParents = {
      ...newPost,
      medias: newPostMedias,
      isLiked: false,
      isRetweet: false,
      parents: [],
    };

    const tweet = await createTweet(false, post.id, userId);

    const newTweet: ITweet = { ...tweet, post };

    return res.status(201).json({ tweet: newTweet });
  } catch (err) {
    console.log("err : ", err);
    return res.sendStatus(500);
  }
};

export default createPost;
