import { Prospect } from "./Prospect";
import { Endereco } from "./Endereco";
import { User } from "./User";
import { Supervisor } from "./Supervisor";
import { Empresa } from "./Empresa";
import { Agendamento } from "./Agendamento";

Endereco.hasOne(Prospect);
Prospect.belongsTo(Endereco);

User.hasMany(Prospect);
Prospect.belongsTo(User);

Supervisor.hasMany(User);
User.belongsTo(Supervisor);

Empresa.hasMany(Supervisor);
Supervisor.belongsTo(Empresa);

Prospect.hasMany(Agendamento);
Agendamento.belongsTo(Prospect);

export { Prospect, Endereco, User, Supervisor, Empresa };
