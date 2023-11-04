import bcrypt from "bcrypt";
import { db } from "../database/database";
import { UserCreationAttributes } from "../models/User";

export const userService = {
  findByCode: async (code: string) => {
    const user: any = await db.query(
      `SELECT * FROM user WHERE codigo='${code}'`
    );
    return user[0][0];
  },

  create: async ({
    codigo,
    email,
    password,
    nome,sobrenome,
    supervisorId,
  }: UserCreationAttributes) => {
    const returnUser: any = await db.query(
      `INSERT INTO user (codigo, email, password, nome, sobrenome, supervisor_id) VALUES ('${codigo}', '${email}', '${password}', '${nome}', '${sobrenome}', ${supervisorId})`
    );
    return returnUser[0];
  },

  checkPassword: async (password: string, hashPassword: string) => {
    return await bcrypt.compare(password, hashPassword);
  },

  getUser: async(id: number) => {
    const user = await db.query(`SELECT user.nome as userNome, user.sobrenome as userSobrenome, user.email as userEmail, supervisor.nome as supervisorNome, supervisor.sobrenome as supervisorSobrenome FROM user INNER JOIN supervisor ON user.supervisor_id = supervisor.idsupervisor WHERE iduser = ${id}`)

    return user[0]
  }
};
