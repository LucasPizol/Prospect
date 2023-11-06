import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { prospectService } from "../services/prospectService";
import { enderecoService } from "../services/enderecoService";
import { Prospect, User } from "../models";

export const prospectController = {
  create: async (req: AuthenticatedRequest, res: Response) => {
    const { nome, descricao, telefone, logradouro, cep, bairro, numero, uf, cidade } = req.body;
    const { id } = req.user!;

    try {
      const EnderecoId = await enderecoService.create({
        logradouro,
        cep,
        bairro,
        numero,
        uf,
        cidade,
      });

      const prospect = await prospectService.create({
        nome,
        descricao,
        finalizado: 0,
        telefone,
        id,
        EnderecoId,
        UserId: id,
      });

      res.status(200).json({
        idprospect: prospect,
        nome,
        descricao,
        telefone,
      });
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
        return res.status(400).json({ message: err.message });
      }
    }
  },

  show: async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.user!;

    try {
      const userList = await prospectService.show(id);
      return res.status(200).json(userList);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },

  update: async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const { nome, descricao, telefone, finalizado, enderecoId, logradouro, cep, bairro, cidade, numero, uf } = req.body;

    try {
      await prospectService.update(Number(id), {
        nome,
        descricao,
        finalizado,
        telefone,
      });

      await enderecoService.update(enderecoId, {
        logradouro,
        cep,
        bairro,
        cidade,
        numero,
        uf,
      });

      return res.status(200).send();
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
};
