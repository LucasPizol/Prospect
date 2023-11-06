import { ResourceOptions } from "adminjs";

export const userResourceOptions: ResourceOptions = {
  navigation: "Administrativo",
  editProperties: ["nome", "sobrenome", "codigo", "email", "password", "supervisorId"],
  listProperties: ["id", "nome", "sobrenome", "codigo", "email", "supervisorId"],
  showProperties: ["id", "nome", "sobrenome", "codigo", "email", "createdAt", "updatedAt"],
};
