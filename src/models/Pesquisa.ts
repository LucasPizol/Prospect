
import { sequelize } from "../database";
import { DataTypes, Model, Optional } from "sequelize";

export interface Pesquisa {
  id: number;
  nomeCliente: string;
  cidade: number;
  UserId: number;
}

export interface PesquisaCreationAttributes
  extends Optional<Pesquisa, "id" > {}

export interface PesquisaInstance
  extends Model<Pesquisa, PesquisaCreationAttributes>,
    Pesquisa {}

export const Pesquisa = sequelize.define<PesquisaInstance, Pesquisa>("Pesquisa", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nomeCliente: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  cidade: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  UserId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: "Users", key: "id" },
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  },
});
