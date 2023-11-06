import { ResourceOptions } from "adminjs";

export const empresaResourceOptions: ResourceOptions = {
  navigation: "Administrativo",
  editProperties: ["codigo"],
  listProperties: ["id", "codigo"],
  showProperties: ["id", "codigo"],
};
