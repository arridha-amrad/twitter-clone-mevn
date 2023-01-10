import { Request, Response } from "express";
import prisma from "@/utils/prisma";
import { hash } from "argon2";

const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  try {
    const hashedPassword = await hash(password);
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
      },
    });
    return res
      .status(200)
      .json({ message: "Congratulations! Registration successful" });
  } catch (error) {
    return res.sendStatus(500);
  }
};

export default register;
