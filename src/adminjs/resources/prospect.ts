import { ResourceOptions } from "adminjs";

export const prospectResourceOptions: ResourceOptions = {
  navigation: "Prospects",
  editProperties: ["nome", "descricao", "finalizado", "telefone", "enderecoId", "userId"],
  listProperties: ["id", "nome", "descricao", "finalizado", "telefone", "enderecoId", "userId"],
  showProperties: ["id", "nome", "descricao", "finalizado", "telefone", "enderecoId", "userId"],
};
