import { Request, Response } from "express";
import prisma from "@/utils/prisma";
import { verify } from "argon2";
import { createToken } from "@/utils/tokenHandler";
import { cookieOptions } from "@/utils/cookieOptions";

const login = async (req: Request, res: Response) => {
  const { identity, password }: { identity: string; password: string } =
    req.body;
  try {
    const user = await prisma.user.findFirst({
      where: identity.includes("@")
        ? {
            email: identity,
          }
        : {
            username: identity,
          },
    });
    if (!user) return res.status(404).json({ message: "user not found" });
    const isMatch = await verify(user.password, password);
    if (!isMatch) return res.status(400).json({ message: "invalid password" });
    const accessToken = await createToken(user.id, "AccessToken");
    const refreshToken = await createToken(user.id, "RefreshToken");
    const bearerAccToken = `Bearer ${accessToken}`;
    const bearerRefToken = `Bearer ${refreshToken}`;
    await prisma.token.create({
      data: {
        value: refreshToken,
        userId: user.id,
      },
    });
    res.cookie("token", bearerRefToken, cookieOptions);
    // @ts-ignore
    const { password: pwd, ...rest } = user;
    return res.status(200).json({ token: bearerAccToken, user: rest });
  } catch (error) {
    console.log("error : ", error);
    return res.sendStatus(500);
  }
};

export default login;
