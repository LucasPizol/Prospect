import { Endereco, EnderecoCreationAttributes } from "../models/Endereco";

export const enderecoService = {
  create: async ({ logradouro, cep, bairro, cidade, numero, uf }: EnderecoCreationAttributes) => {
    const endereco = await Endereco.create({
      logradouro,
      cep,
      bairro,
      cidade,
      numero,
      uf,
    });

    return endereco.id;
  },

  update: async (enderecoId: number, attributes: { logradouro: string; cep: string; bairro: string; cidade: string; numero: number; uf: string }) => {
    await Endereco.update(attributes, {
      where: {
        id: enderecoId,
      },
    });
  },
};
