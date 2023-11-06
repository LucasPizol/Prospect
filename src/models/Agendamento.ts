import { sequelize } from "../database";
import { DataTypes, Model, Optional } from "sequelize";

export interface Agendamento {
  id: number;
  dataVisita: Date;
  dataFim: Date;
  descricao: string;
  frequencia: number;
  ProspectId: number;
  finalizado: boolean;
  codAgendamento: string;
}

export interface AgendamentoCreationAttributes extends Optional<Agendamento, "id"> {}

export interface AgendamentoInstance extends Model<Agendamento, AgendamentoCreationAttributes>, Agendamento {}

export const Agendamento = sequelize.define<AgendamentoInstance, Agendamento>("Agendamento", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  dataVisita: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  dataFim: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  descricao: {
    allowNull: true,
    type: DataTypes.TEXT,
  },
  frequencia: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  codAgendamento: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  finalizado: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  ProspectId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: "Users", key: "id" },
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  },
});
