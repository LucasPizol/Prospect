import express from "express";
import cors from "cors";
import { router } from "./routes";
import { sequelize } from "./database";
import { adminJs, adminJsRouter } from "./adminjs";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.static("public"));
app.use(adminJs.options.rootPath, adminJsRouter)

app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  sequelize.authenticate().then(() => {
    console.log("Conectado ao DB")
  })
  console.log("Server started sucessfully");
});
