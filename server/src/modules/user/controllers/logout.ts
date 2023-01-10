import { Request, Response } from "express";
import prisma from "@/utils/prisma";

const logout = async (req: Request, res: Response) => {
  try {
    const bearerRefToken = req.cookies.token;
    if (!bearerRefToken) return res.sendStatus(400);
    const refToken = (bearerRefToken as string).split(" ")[1];
    const token = await prisma.token.findFirst({ where: { value: refToken } });
    if (!token) return res.sendStatus(400);
    await prisma.token.delete({
      where: {
        id: token.id,
      },
    });
    res.status(200).clearCookie("token").json({ message: "logout gracefully" });
    return;
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export default logout;
