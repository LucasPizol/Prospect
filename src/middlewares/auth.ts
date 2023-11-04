import { NextFunction, Request, Response } from "express";
import { jwtService } from "../services/jwtService";
import { userService } from "../services/userService";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../models/User";

export interface AuthenticatedRequest extends Request {
  user?: User | null;
}

export function ensureAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader)
    return res
      .status(401)
      .json({ message: "Não autorizado: Nenhum token foi encontrado." });

  const token = authorizationHeader.replace(/Bearer /, "");

  jwtService.verifyToken(token, async (err, decoded) => {
    if (err || !decoded)
      return res.status(401).json({
        message: "Não autorizado: token inválido",
      });

    const user = await userService.findByCode((decoded as JwtPayload).code);

    req.user = user;

    next();
  });
}
