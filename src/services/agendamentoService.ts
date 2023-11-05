import { log } from "console";
import { db } from "../database/database";
import { AgendamentoCreationAttributes } from "../models/Agendamento";
import randomStr from "./randomNumService";

interface UpdateAgendamento {
  dataVisita: Date;
  dataFim: Date;
  descricao: string;
  frequencia: number;
  idsituacao: number;
}

export const agendamentoService = {
  create: async ({ dataVisita, dataFim, descricao, frequencia, idprospect, idsituacao }: AgendamentoCreationAttributes) => {
    const dateDataInicio = new Date(dataVisita);
    const dateDataFim = new Date(dataFim);
    const agendamentoCode = randomStr.getRandomNum(20);

    for (let i = dateDataInicio.getTime(); i < dateDataFim.getTime(); i = dateDataInicio.setDate(dateDataInicio.getDate() + frequencia * 7)) {
      await db.query(`INSERT INTO agendamento (cod_agendamento, data_visita, data_fim, descricao, frequencia, prospect_idprospect, situacao_idsituacao)
      VALUES (
        '${agendamentoCode}',
        '${dateDataInicio.toISOString().slice(0, 10)}', '${dataFim}', '${descricao}', ${frequencia}, ${idprospect}, ${idsituacao})
      `);
    }

    return;
  },

  show: async (userid: number) => {
    const agendamentos = await db.query(`
        SELECT
        idagendamento,
        data_visita as dataVisita,
        data_fim as dataFim,
        agendamento.descricao as descAgendamento,
        frequencia,
        nome,
        prospect.descricao as descProspect,
        telefone,
        logradouro,
        cep,
        bairro,
        cidade,
        prospect.idprospect as idprospect
        FROM agendamento
        INNER JOIN prospect
        ON agendamento.prospect_idprospect = prospect.idprospect
        INNER JOIN endereco ON  prospect.endereco_idendereco = endereco.idendereco
        WHERE user_iduser = ${userid}
        `);

    return agendamentos[0];
  },

  showByDate: async (date: string, id: number) => {

    console.log(id)
    const agendamentos = await db.query(`
    SELECT
    idagendamento,
    data_visita as dataVisita,
    data_fim as dataFim,
    agendamento.descricao as descAgendamento,
    frequencia,
    nome,
    prospect.descricao as descProspect,
    telefone,
    logradouro,
    cep,
    bairro,
    cidade,
    numero,
    UF,
    cod_agendamento as codAgendamento,
    prospect.idprospect as idprospect
    FROM agendamento
    INNER JOIN prospect
    ON agendamento.prospect_idprospect = prospect.idprospect
    INNER JOIN endereco ON prospect.endereco_idendereco = endereco.idendereco
    WHERE data_visita= '${date}' AND user_iduser = ${id}
    `);

    return agendamentos[0];
  },
  update: async ({ dataVisita, dataFim, descricao, frequencia, idsituacao }: UpdateAgendamento, idagendamento: number) => {
    await db.query(
      `UPDATE agendamento SET data_visita='${dataVisita}', data_fim = '${dataFim}', descricao = '${descricao}', frequencia=${frequencia}, situacao_idsituacao = ${idsituacao} WHERE idagendamento=${idagendamento}`
    );
  },

  delete: async (idagendamento: number) => {
    await db.query(`DELETE FROM agendamento WHERE idagendamento=${idagendamento}`);
  },

  deleteAll: async (id: number, codAgendamento: string) => {
    await db.query(`DELETE FROM agendamento WHERE idagendamento >= ${id} AND cod_agendamento='${codAgendamento}'`);
  },
};
