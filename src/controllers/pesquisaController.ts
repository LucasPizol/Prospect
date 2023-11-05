import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { pesquisaService } from "../services/pesquisaService";

export const pesquisaController = {
  getById: async (req: AuthenticatedRequest, res: Response) => {
    const { iduser } = req.user!;

    try {
      const data = await pesquisaService.getById(iduser);
      return res.status(200).json(data);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },

  send: async (req: AuthenticatedRequest, res: Response) => {
    const { linha_1, linha_2, moto, pesadas, lubel, frota } = req.body;
    const { id } = req.params;

    try {
      await pesquisaService.send({ idpesquisa_potencial: Number(id), linha_1, linha_2, moto, pesadas, lubel, frota });
      return res.status(200).send();
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
        return res.status(400).json({ message: err.message });
      }
    }
  },
};
