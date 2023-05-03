import { createToken, verifyToken } from "@/utils/jwt";
import { Request, Response } from "express";
import prisma from "@/utils/prisma";
import { cookieOptions } from "@/utils/cookieOptions";
import { REFRESH_TOKEN } from "../user.constants";

const refreshToken = async (req: Request, res: Response) => {
	const bearerRefToken = req.cookies[REFRESH_TOKEN];
	try {
		if (!bearerRefToken) throw new Error("no ref token found");
		const token = bearerRefToken.split(" ")[1];
		const { userId } = await verifyToken(token, "RefreshToken");
		const user = await prisma.user.findFirst({ where: { id: userId } });
		if (!user) throw new Error("user not found");
		const accToken = await createToken(user.id, "AccessToken");
		const refToken = await createToken(user.id, "RefreshToken");
		const storedToken = await prisma.token.findFirst({
			where: { value: token },
		});
		if (!storedToken) throw new Error("stored token not found");

		await prisma.token.update({
			data: {
				value: refToken,
			},
			where: {
				id: storedToken.id,
			},
		});
		const bearerAccToken = `Bearer ${accToken}`;
		const newBearerRefToken = `Bearer ${refToken}`;
		res.cookie(REFRESH_TOKEN, newBearerRefToken, cookieOptions);
		return res.status(200).json({ user, token: bearerAccToken });
	} catch (err) {
		console.log(err);
		return res.sendStatus(500);
	}
};

export default refreshToken;
