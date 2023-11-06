import AdminJs from "adminjs";
import AdminJsExpress from "@adminjs/express";
import { sequelize } from "../database";
import AdminJSSequelize from "@adminjs/sequelize";
import { adminJsResources } from "./resources";

AdminJs.registerAdapter(AdminJSSequelize);

export const adminJs = new AdminJs({
  databases: [sequelize],
  rootPath: "/admin",
  resources: adminJsResources,
  branding: {
    companyName: "Prospect",
    theme: {
      colors: {
        primary100: "#000080",
        primary80: "#0000cd",
        primary60: "#0000ff",
        primary40: "#00aaff",
        primary20: "#add8e6",
        grey100: "#151515",
        grey80: "#333333",
        grey60: "#4d4d4d",
        grey40: "#666666",
        grey20: "#dddddd",
        filterBg: "#333333",
        accent: "#151515",
        hoverBg: "#151515",
      },
    },
  },
});

export const adminJsRouter = AdminJsExpress.buildRouter(adminJs);
