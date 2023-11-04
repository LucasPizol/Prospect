import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { agendamentoService } from "../services/agendamentoService";

export const agendamentoController = {
  create: async (req: AuthenticatedRequest, res: Response) => {
    const {
      dataVisita,
      dataFim,
      descricao,
      frequencia,
      idprospect,
      idsituacao,
    } = req.body;

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
      await agendamentoService.update(
        { dataVisita, dataFim, descricao, frequencia, idsituacao },
        Number(id)
      );
      return res.status(200).send();
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },

  delete: async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;

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

  showByDate: async (req: AuthenticatedRequest, res: Response) => {
    const { date } = req.body;
    const { iduser } = req.user!;

    const splitedDate = date.split("-");
    const dateToSend = new Date(
      splitedDate[2],
      splitedDate[1] - 1,
      splitedDate[0]
    );

    try {
      const response = await agendamentoService.showByDate(dateToSend, Number(iduser));
      return res.status(200).json(response);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
};
