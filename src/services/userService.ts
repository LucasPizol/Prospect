import bcrypt from "bcrypt";
import { UserCreationAttributes } from "../models/User";
import { Empresa, Supervisor, User } from "../models";
export const userService = {
  findByCode: async (codigo: string) => {
    const user = await User.findOne({
      where: {
        codigo,
      },
      attributes: ["id", "codigo", "nome", "sobrenome", "email", "password"],
    });
    return user;
  },

  create: async ({ codigo, email, password, nome, sobrenome, SupervisorId }: UserCreationAttributes) => {
    await Supervisor.create({
      nome: "Fabio",
      sobrenome: "Reis",
      email: "fabio.reis@bateriasmoura.com",
      password: "123456",
      codigo: "60101",
      EmpresaId: 1,
    });

    const returnUser = await User.create({
      codigo,
      email,
      password,
      nome,
      sobrenome,
      SupervisorId,
    });
    return returnUser;
  },

  checkPassword: async (password: string, hashPassword: string) => {
    return await bcrypt.compare(password, hashPassword);
  },

  getUser: async (id: number) => {
    const user = await User.findByPk(id, {
      attributes: ["nome", "sobrenome", "email"],
      include: {
        model: Supervisor,
        include: ["nome", "sobrenome", "email"],
      },
    });

    return user;
  },
};
