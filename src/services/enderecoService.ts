import { db } from "../database/database";
import { EnderecoCreationAttributes } from "../models/Endereco";

export const enderecoService = {
  create: async ({
    logradouro,
    cep,
    bairro,
    cidade,
    numero,
    UF,
  }: EnderecoCreationAttributes) => {
    const endereco: any =
      await db.query(`INSERT INTO endereco(logradouro, cep, bairro, numero, UF, cidade) VALUES (
        '${logradouro}', '${cep}', '${bairro}', ${numero}, '${UF}', '${cidade}')
      `);

    return endereco[0].insertId;
  },

  update: async (
    { logradouro, cep, bairro, numero, UF, cidade }: EnderecoCreationAttributes,
    id: number
  ) => {
    await db.query(`UPDATE endereco SET
            logradouro = '${logradouro}', cep = '${cep}', bairro = '${bairro}', numero=${numero}, UF='${UF}', cidade = '${cidade}'
            WHERE idendereco = ${id}
          `);
  },

  delete: async (id: number) => {
    await db.query(`DELETE FROM endereco WHERE idendereco = ${id}`);
  },

};
