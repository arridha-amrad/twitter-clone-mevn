import { Request, Response } from "express";
import prisma from "@/utils/prisma";
import { deleteImage } from "@/utils/cloudinary";
const deletePost = async (req: Request, res: Response) => {
  const { postId } = req.params;
  try {
    const post = await prisma.post.findFirst({
      where: {
        id: postId,
      },
      include: {
        medias: true,
      },
    });
    if (!post) {
      return res.sendStatus(404);
    }
    if (post?.authorId !== req.app.locals.userId) {
      return res.status(400).json({ message: "not authorize" });
    }

    for (const media of post.medias) {
      await deleteImage(media.url);
    }

    const deletedPost = await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    if (!deletedPost) {
      return res.status(404).json({ message: "post not found" });
    }
    return res.status(200).send("One post deleted");
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export default deletePost;
