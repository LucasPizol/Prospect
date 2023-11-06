import { Request, Response } from "express";
import { userService } from "../services/userService";
import { jwtService } from "../services/jwtService";
import bcrypt from "bcrypt";

export const authController = {
  register: async (req: Request, res: Response) => {
    const { codigo, email, password, nome, sobrenome, SupervisorId } = req.body;
    try {
      const encryptedPassword = await bcrypt.hash(String(password), 10);

      const createdUser = await userService.create({
        codigo,
        email,
        password: encryptedPassword,
        nome,
        sobrenome,
        SupervisorId,
      });

      res.status(200).send({
        iduser: createdUser?.id,
        email,
        password: encryptedPassword,
      });
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },

  login: async (req: Request, res: Response) => {
    const { code, password } = req.body;

    try {
      const user = await userService.findByCode(code);

      if (!user) {
        return res.status(404).json({ message: "Usuário ou senha incorretos." });
      }
      const isSame = await userService.checkPassword(password, user.getDataValue("password"));
      if (!isSame) return res.status(404).json({ message: "Usuário ou senha incorretos." });

      const payload = {
        id: user.getDataValue("id"),
        codigo: user.getDataValue("codigo"),
        email: user.getDataValue("email"),
      };

      const token = jwtService.signToken(payload, "7d");

      return res.json({ authenticated: true, ...payload, token });
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
};
