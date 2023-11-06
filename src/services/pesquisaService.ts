import { db } from "../database";
import { PesquisaUpdate } from "../models/Pesquisa";

export const pesquisaService = {
  getById: async (id: number) => {
    const response: any = await db.query(`SELECT * FROM pesquisa_potencial WHERE user_iduser = ${id} AND finalizado = 0 ORDER BY nome_cliente`);
    return response[0];
  },

  send: async ({ idpesquisa_potencial, linha_1, linha_2, moto, pesadas, lubel, frota }: PesquisaUpdate) => {
    const response: any = await db.query(`UPDATE pesquisa_potencial
    SET
    1_linha = ${linha_1},
    2_linha = ${linha_2},
    moto = ${moto},
    pesadas = ${pesadas},
    lubel = ${lubel},
    frota = ${frota},
    finalizado = 1
    WHERE idpesquisa_potencial = ${idpesquisa_potencial}
    `);
    return response[0];
  },
};
