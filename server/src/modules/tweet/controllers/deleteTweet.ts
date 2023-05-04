import { Request, Response } from "express";
import prisma from "@/utils/prisma";
import { deleteImage } from "@/utils/cloudinary";
const deleteTweet = async (req: Request, res: Response) => {
  const { tweetId } = req.params;
  const userId = req.app.locals.userId;
  try {
    const tweet = await prisma.tweet.findFirst({
      where: { id: tweetId },
      include: {
        post: {
          include: {
            files: {
              select: { url: true },
            },
          },
        },
      },
    });

    console.log("tweet : ", JSON.stringify(tweet));

    if (!tweet) return res.status(404).json({ error: "Tweet not found" });
    if (tweet.userId !== userId)
      return res.status(400).json({ message: "You are not authorized" });
    if (!tweet.isRetweet) {
      // delete files, post
      const files = tweet.post.files;
      if (files.length > 0) {
        for (const file of files) {
          await deleteImage(file.url);
        }
      }
    }
    await prisma.tweet.delete({ where: { id: tweetId } });
    if (!tweet.isRetweet) {
      await prisma.post.delete({ where: { id: tweet.postId } });
    }
    return res.status(200).json({ message: "Tweet deleted" });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export default deleteTweet;
