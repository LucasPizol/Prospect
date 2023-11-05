import express from "express";
import { authController } from "./controllers/authController";
import { prospectController } from "./controllers/prospectController";
import { ensureAuth } from "./middlewares/auth";
import { enderecoController } from "./controllers/enderecoController";
import { agendamentoController } from "./controllers/agendamentoController";
import { usersController } from "./controllers/usersController";
import { pesquisaController } from "./controllers/pesquisaController";

const router = express.Router();

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);

router.get("/user", ensureAuth, usersController.get);

router.post("/prospect", ensureAuth, prospectController.create);
router.get("/prospect", ensureAuth, prospectController.show);
router.put("/prospect/:id", ensureAuth, prospectController.update);
router.delete("/prospect/:id", ensureAuth, prospectController.delete);

router.put("/endereco/:id", ensureAuth, enderecoController.update);

router.get("/agendamento", ensureAuth, agendamentoController.show);
router.get("/agendamento/date", ensureAuth, agendamentoController.showByDate);
router.post("/agendamento", ensureAuth, agendamentoController.create);
router.put("/agendamento/:id", ensureAuth, agendamentoController.update);
router.delete("/agendamento/:id", ensureAuth, agendamentoController.delete);

router.post("/agendamentos/updateAll", ensureAuth, agendamentoController.updateAll);
router.delete("/agendamentos/:id/:cod", ensureAuth, agendamentoController.deleteAll);

router.get("/pesquisa", ensureAuth, pesquisaController.getById);
router.put("/pesquisa/:id", ensureAuth, pesquisaController.send)

export { router };
