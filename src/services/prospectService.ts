import { db } from "../database/database";
import { EnderecoCreationAttributes } from "../models/Endereco";
import { ProspectCreationAttributes } from "../models/Prospect";

interface UpdateProspect {
  nome: string;
  descricao: string;
  finalizado: number;
  telefone: string;
}

export const prospectService = {
  create: async ({
    nome,
    descricao,
    finalizado,
    telefone,
    idendereco,
    iduser,
  }: ProspectCreationAttributes) => {
    const today = new Date().toISOString().slice(0, 10);

    const prospect: any = await db.query(`
        INSERT INTO prospect (nome, descricao, finalizado, telefone, created_at, updated_at, endereco_idendereco, user_iduser)
        VALUES ('${nome}', '${descricao}', '${finalizado}', '${telefone}', '${today}', '${today}', ${idendereco}, ${iduser})
        `);

    return prospect[0];
  },

  show: async (iduser: number) => {
    const prospectList = await db.query(`SELECT 
    idprospect,
    nome, descricao, finalizado, telefone, created_at as createdAt, updated_at as updatedAt, logradouro, cep, bairro,cidade, numero, endereco_idendereco
    FROM prospect
    INNER JOIN endereco ON prospect.endereco_idendereco = endereco.idendereco
    WHERE user_iduser = ${iduser} 
    `);

    return prospectList[0];
  },

  update: async (
    { nome, descricao, finalizado, telefone }: UpdateProspect,

    id: number
  ) => {
    const today = new Date().toISOString().slice(0, 10);

    await db.query(`UPDATE prospect
    SET nome='${nome}', descricao = '${descricao}', finalizado=${finalizado}, telefone='${telefone}', updated_at = '${today}'
    WHERE idprospect = ${id}
    `);
  },

  delete: async (id: number, idEndereco: number) => {
    await db.query(`DELETE FROM agendamento WHERE prospect_idprospect = ${id}`);
    await db.query(`DELETE FROM prospect WHERE idprospect = ${id}`);
    await db.query(`DELETE FROM endereco WHERE idendereco  =${idEndereco}`);
  },

  findById: async (id: number) => {
    const prospect: any = await db.query(
      `SELECT * FROM prospect WHERE idprospect = ${id}`
    );
    return prospect[0][0];
  },
};
