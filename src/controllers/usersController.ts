import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { userService } from "../services/userService";

export const usersController = {
  get: async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.user!;

    try {
      const data = await userService.getUser(id);
      res.status(200).json(data);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
};
