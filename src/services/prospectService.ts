import { Endereco, EnderecoCreationAttributes } from "../models/Endereco";
import { ProspectCreationAttributes } from "../models/Prospect";
import { Prospect, User } from "../models";

export const prospectService = {
  create: async ({ nome, descricao, finalizado, telefone, EnderecoId, UserId }: ProspectCreationAttributes) => {
    const prospect = await Prospect.create({
      nome,
      descricao,
      finalizado,
      telefone,
      EnderecoId,
      UserId,
    });

    return prospect.id;
  },

  show: async (UserId: number) => {
    const list = await Prospect.findAll({
      attributes: ["nome", "descricao", "finalizado"],
      include: [
        {
          model: Endereco,
          attributes: ["id", "logradouro", "cep", "bairro", "cidade", "numero"],
        },
        {
          model: User,
          attributes: ["id", "nome", "sobrenome"],
        },
      ],
      where: {
        UserId,
      },
    });

    return list;
  },

  update: async (id: number, attributes: { nome: string; finalizado: number; descricao: string; telefone: string }) => {
    const [affectedRows, updatedProspect] = await Prospect.update(attributes, {
      where: {
        id,
      },
      returning: true,
      individualHooks: true,
    });

    return updatedProspect[0];
  },
};
