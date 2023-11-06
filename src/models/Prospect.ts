import { sequelize } from "../database";
import { DataTypes, Model, Optional } from "sequelize";
import { Endereco } from "./Endereco";
import { User } from "./User";

export interface Prospect {
  id: number;
  nome: string;
  descricao: string;
  finalizado: number;
  telefone: string;
  EnderecoId: number;
  UserId: number;
}

export interface ProspectCreationAttributes extends Optional<Prospect, "id"> {}

export interface ProspectInstance extends Model<Prospect, ProspectCreationAttributes>, Prospect {}

export const Prospect = sequelize.define<ProspectInstance, Prospect>("Prospect", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nome: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  descricao: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  finalizado: {
    type: DataTypes.BOOLEAN,
  },
  telefone: {
    defaultValue: false,
    type: DataTypes.STRING,
  },
  EnderecoId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: Endereco, key: "id" },
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  },
  UserId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: User, key: "id" },
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  },
});
