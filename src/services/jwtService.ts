import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const getSecret = (): string => {
  const secret = process.env.JWS_TOKEN;
  if (!secret) return "";
  return secret;
};

export const jwtService = {
  signToken: (payload: string | object | Buffer, expiration: string) => {
    return jwt.sign(payload, getSecret(), {
      expiresIn: expiration,
    });
  },

  verifyToken: (token: string, callbackfn: jwt.VerifyCallback) => {
    jwt.verify(token, getSecret(), callbackfn);
  },
};
