import { Prospect } from "../models";
import { Agendamento, AgendamentoCreationAttributes } from "../models/Agendamento";
import randomStr from "./randomNumService";
import { Op } from "sequelize";

export const agendamentoService = {
  create: async ({ dataVisita, dataFim, descricao, frequencia, ProspectId, finalizado }: AgendamentoCreationAttributes) => {
    const dateDataInicio = new Date(dataVisita);
    const dateDataFim = new Date(dataFim);
    const agendamentoCode = randomStr.getRandomNum(20);

    console.log(dateDataInicio);

    for (let i = dateDataInicio.getTime(); i < dateDataFim.getTime(); i = dateDataInicio.setDate(dateDataInicio.getDate() + frequencia * 7)) {
      await Agendamento.create({
        dataVisita: dateDataInicio,
        dataFim,
        descricao,
        frequencia,
        ProspectId,
        codAgendamento: agendamentoCode,
        finalizado,
      });
    }

    return;
  },

  show: async (id: number) => {
    const agendamentos = await Agendamento.findAll({
      where: {
        ProspectId: id,
      },
    });

    return agendamentos;
  },

  showByDate: async (dataVisita: string, id: number) => {
    const agendamentos = await Agendamento.findAll({
      where: {
        id,
        dataVisita,
      },
    });
  },

  deleteAll: async (id: number, codAgendamento: string) => {
    await Agendamento.destroy({
      where: {
        id: {
          [Op.gte]: id,
        },
        codAgendamento,
      },
    });
  },

  deleteOne: async (id: number) => {
    await Agendamento.destroy({
      where: {
        id,
      },
    });
  },

  getByDate: async (id: number, dataVisita: Date) => {
    const agendamentos = await Agendamento.findAll({
      where: {
        dataVisita,
      },
      attributes: ["dataVisita", "dataFim", "descricao", "frequencia", "codAgendamento"],
      include: {
        model: Prospect,
        attributes: ["id", "nome", ["descricao", "prospect_descricao"], "telefone", "finalizado"],
        where: {
          user_id: id,
        },
      },
    });

    return agendamentos;
  },

  updateAll: async (id: number, attributes: { dataVisita: Date; dataFim: Date; descricao: string; frequencia: number; finalizado: boolean }) => {
    await Agendamento.update(attributes, {
      where: {
        id,
      },
    });
  },

  finish: async (id: number) => {
    await Agendamento.update(
      {
        finalizado: true,
      },
      {
        where: {
          id,
        },
      }
    );
  },
};
