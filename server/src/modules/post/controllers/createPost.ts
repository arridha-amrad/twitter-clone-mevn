import { Request, Response } from "express";

import prisma from "@/utils/prisma";
import { POST_INCLUDED_DATA } from "../post.constants";
import { IPostWithParents } from "../post.types";
import { upload } from "@/utils/cloudinary";
import { Media } from "@prisma/client";

import fs from "fs";

const createPost = async (req: Request, res: Response) => {
  const postDescription = req.body.text;
  const images = req.files?.images;

  console.log(images);

  try {
    const userId = req.app.locals.userId;
    const mediaURL: string[] = [];
    if (images) {
      if (images instanceof Array) {
        for (let i = 0; i < images.length; i++) {
          console.log("temp : ", images[i].tempFilePath);
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
      isReposted: false,
      parents: [],
    };

    return res.status(201).json({ post });
  } catch (err) {
    console.log("err : ", err);
    return res.sendStatus(500);
  }
};

export default createPost;
