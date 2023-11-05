import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { agendamentoService } from "../services/agendamentoService";

export const agendamentoController = {
  create: async (req: AuthenticatedRequest, res: Response) => {
    const { dataVisita, dataFim, descricao, frequencia, idprospect, idsituacao } = req.body;

    console.log({ dataVisita, dataFim, descricao, frequencia, idprospect, idsituacao });

    try {
      const idagendamento = await agendamentoService.create({
        dataVisita,
        dataFim,
        descricao,
        frequencia,
        idprospect,
        idsituacao,
      });

      return res.status(200).json({
        idagendamento,
        dataVisita,
        dataFim,
        descricao,
        frequencia,
        idprospect,
        idsituacao,
      });
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },

  show: async (req: AuthenticatedRequest, res: Response) => {
    const { iduser } = req.user!;

    try {
      const agendamentos = await agendamentoService.show(iduser);

      return res.status(200).json(agendamentos);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },

  update: async (req: AuthenticatedRequest, res: Response) => {
    const { dataVisita, dataFim, descricao, frequencia, idsituacao } = req.body;
    const { id } = req.params;

    try {
      await agendamentoService.update({ dataVisita, dataFim, descricao, frequencia, idsituacao }, Number(id));
      return res.status(200).send();
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
      await agendamentoService.delete(Number(id));

      return res.status(200).json();
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },

  deleteAll: async (req: AuthenticatedRequest, res: Response) => {
    const { id, cod } = req.params;

    try {
      await agendamentoService.deleteAll(Number(id), cod);
      return res.status(200).json();
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
  updateAll: async (req: AuthenticatedRequest, res: Response) => {
    const { idagendamento, codAgendamento, dataVisita, dataFim, descAgendamento, frequencia, idprospect, idsituacao } = req.body;

    try {
      await agendamentoService.deleteAll(Number(idagendamento), codAgendamento);
      await agendamentoService.create({ dataVisita, dataFim, descricao: descAgendamento, frequencia, idprospect, idsituacao });
      return res.status(200).json();
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },

  showByDate: async (req: AuthenticatedRequest, res: Response) => {
    const { filter } = req.query!;
    const { iduser } = req.user!;

    if (!filter || typeof filter !== "string") return res.status(400).json({ error: "Data inválida" });

    try {
      const response = await agendamentoService.showByDate(filter, Number(iduser));
      return res.status(200).json(response);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
        return res.status(400).json({ message: err.message });
      }
    }
  },
};
