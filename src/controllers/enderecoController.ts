import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { enderecoService } from "../services/enderecoService";

export const enderecoController = {
  update: async (req: AuthenticatedRequest, res: Response) => {
    const { logradouro, cep, bairro, numero, UF, cidade } = req.body;

    const { id } = req.params;

    try {
      await enderecoService.update(
        {
          logradouro,
          cep,
          bairro,
          numero,
          UF,
          cidade,
        },
        Number(id)
      );

      res.status(200).send();
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
};
