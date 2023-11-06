import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { agendamentoService } from "../services/agendamentoService";

export const agendamentoController = {
  create: async (req: AuthenticatedRequest, res: Response) => {
    const { dataVisita, dataFim, descricao, frequencia, ProspectId, codAgendamento } = req.body;

    try {
      await agendamentoService.create({
        dataVisita,
        dataFim,
        descricao,
        frequencia,
        finalizado: false,
        ProspectId,
        codAgendamento,
      });

      return res.status(200).json({ message: "Sucesso" });
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },

  show: async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.user!;

    try {
      const agendamentos = await agendamentoService.show(id);
      return res.status(200).json(agendamentos);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },

  getByDate: async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.user!;
    const { filter } = req.query;

    if (typeof filter !== "string") {
      return;
    }

    try {
      const agendamento = await agendamentoService.getByDate(Number(id), new Date(filter));

      res.status(200).json(agendamento);
    } catch (err) {}
  },

  deleteOne: async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;

    try {
      await agendamentoService.deleteOne(Number(id));
      return res.status(200).send();
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
  deleteAll: async (req: AuthenticatedRequest, res: Response) => {
    const { cod } = req.query;
    const { id } = req.params;

    if (typeof cod !== "string") {
      return;
    }

    try {
      await agendamentoService.deleteAll(Number(id), cod);
      return res.status(200).send();
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
  updateAll: async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const { dataVisita, dataFim, descricao, frequencia, ProspectId, codAgendamento } = req.body;

    try {
      await agendamentoService.deleteAll(Number(id), codAgendamento);
      await agendamentoService.create({ dataVisita, dataFim, descricao, frequencia, finalizado: false, ProspectId, codAgendamento });
      return res.status(200).send();
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },

  finish: async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;

    try {
      await agendamentoService.finish(Number(id));
      return res.status(200).send();
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
};
