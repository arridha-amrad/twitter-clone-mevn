import jwt from "jsonwebtoken";
import * as fs from "fs";
import { NextFunction, Request, Response } from "express";

const privateKey = fs.readFileSync("./private.pem");
const publicKey = fs.readFileSync("./public.pem");

export type TokenTypes = "AccessToken" | "LinkToken" | "RefreshToken";

export interface IVerifyTokenPayload {
  userId: string;
  type: TokenTypes;
  iat: number;
  exp: number;
}

const setDuration = (type: TokenTypes) => {
  switch (type) {
    case "AccessToken":
      return "5s";
    case "LinkToken":
      return "1d";
    default:
      return "1y";
  }
};

export const createToken = async (
  userId: string,
  type: TokenTypes
): Promise<string> => {
  const result: string = await new Promise((resolve, reject) => {
    jwt.sign(
      { userId, type },
      privateKey,
      {
        algorithm: "RS256",
        expiresIn: setDuration(type),
      },
      (err, token) => {
        if (err !== null) {
          reject(new Error(`Failure on creating token : ${err.message}`));
        }
        resolve(token as string);
      }
    );
  });
  return result;
};

export const verifyToken = async (
  token: string,
  type: TokenTypes
): Promise<IVerifyTokenPayload> => {
  const result: IVerifyTokenPayload = await new Promise((resolve, reject) => {
    jwt.verify(
      token,
      publicKey,
      {
        algorithms: ["RS256"],
        maxAge: setDuration(type),
      },
      (err, payload) => {
        if (err !== null) {
          reject(new Error(err.message));
        }
        const data = payload as IVerifyTokenPayload;
        resolve(data);
      }
    );
  });
  return result;
};

export const verifyAuthToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const bearerToken = req.headers.authorization;
  if (bearerToken === undefined || bearerToken === "") {
    res.sendStatus(401);
    return;
  }
  const token = bearerToken.split(" ")[1];

  jwt.verify(
    token,
    publicKey,
    {
      algorithms: ["RS256"],
      maxAge: "5s",
    },
    (err, payload) => {
      if (err !== null) {
        if (err.message === "jwt expired") {
          const files = req.files?.images;
          if (files) {
            if (files instanceof Array) {
              for (let file of files) {
                fs.unlinkSync(file.tempFilePath);
              }
            } else {
              fs.unlinkSync(files.tempFilePath);
            }
          }
          return res.status(401).send("token expired");
        } else {
          throw new Error(`Verification token failure : ${err.message}`);
        }
      }
      const { userId, type } = payload as IVerifyTokenPayload;
      if (type !== "AccessToken") {
        res.status(403).json({ error: "invalid token" });
        return;
      }
      req.app.locals.userId = userId;
      next();
    }
  );
};
