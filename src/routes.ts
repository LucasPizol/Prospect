import express from "express";
import { authController } from "./controllers/authController";
import { prospectController } from "./controllers/prospectController";
import { ensureAuth } from "./middlewares/auth";
import { enderecoController } from "./controllers/enderecoController";
import { agendamentoController } from "./controllers/agendamentoController";
import { usersController } from "./controllers/usersController";

const router = express.Router();

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);

router.get("/user", ensureAuth, usersController.get);

router.post("/prospect", ensureAuth, prospectController.create);
router.get("/prospect", ensureAuth, prospectController.show);
router.put("/prospect/:id", ensureAuth, prospectController.update);

router.get("/agendamento", ensureAuth, agendamentoController.show);
router.post("/agendamento", ensureAuth, agendamentoController.create);
router.put("/agendamento/:id", ensureAuth, agendamentoController.updateAll);
router.put("/agendamento/finish/:id", ensureAuth, agendamentoController.finish);

router.delete("/agendamento/:id", ensureAuth, agendamentoController.deleteOne);

router.delete("/agendamentos/:id", ensureAuth, agendamentoController.deleteAll);

router.get("/agendamento/date", ensureAuth, agendamentoController.getByDate);

export { router };
