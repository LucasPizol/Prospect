import { ResourceOptions } from "adminjs";

export const supervisorResourceOptions: ResourceOptions = {
  navigation: "Administrativo",
  editProperties: ["nome", "sobrenome", "codigo", "email", "password", "empresaId"],
  listProperties: ["id", "nome", "sobrenome", "codigo", "email", "empresaId"],
  showProperties: ["id", "nome", "sobrenome", "codigo", "email", "createdAt", "updatedAt", "empresaId"],
};
