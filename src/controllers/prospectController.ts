import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { prospectService } from "../services/prospectService";
import { enderecoService } from "../services/enderecoService";

export const prospectController = {
  create: async (req: AuthenticatedRequest, res: Response) => {
    const {
      nome,
      descricao,
      telefone,
      logradouro,
      cep,
      bairro,
      numero,
      UF,
      cidade,
    } = req.body;

    console.log({
      nome,
      descricao,
      telefone,
      logradouro,
      cep,
      bairro,
      numero,
      UF,
      cidade,
    });

    const { iduser } = req.user!;

    try {
      const idendereco = await enderecoService.create({
        logradouro,
        cep,
        bairro,
        numero,
        UF,
        cidade,
      });

      const prospect = await prospectService.create({
        nome,
        descricao,
        finalizado: 0,
        telefone,
        iduser,
        idendereco,
      });

      res.status(200).json({
        idprospect: prospect.insertId,
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
    const { iduser } = req.user!;

    try {
      const userList = await prospectService.show(iduser);
      return res.status(200).json(userList);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },

  update: async (req: AuthenticatedRequest, res: Response) => {
    const {
      nome,
      descricao,
      telefone,
      finalizado,
      idendereco,
      numero,
      logradouro,
      cep,
      bairro,
      UF,
      cidade,
    } = req.body;

    const { id } = req.params;

    try {
      await prospectService.update(
        {
          nome,
          descricao,
          finalizado,
          telefone,
        },

        Number(id)
      );
      await enderecoService.update(
        { logradouro, cep, bairro, UF, cidade, numero },
        idendereco
      );

      res.status(200).send();
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },

  delete: async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;

    console.log(id);

    try {
      const prospect = await prospectService.findById(Number(id));

      if (!prospect.endereco_idendereco) {
        return res.status(404).json({ message: "Prospect não encontrado" });
      }

      await prospectService.delete(
        Number(id),
        Number(prospect.endereco_idendereco)
      );

      return res.status(200).send();
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
};
