// src/models/User.ts

import { sequelize } from "../database";
import { DataTypes, Model, Optional } from "sequelize";

export interface Empresa {
  id: number;
  codigo: string;
}

export interface EmpresaCreationAttributes extends Optional<Empresa, "id"> {}

export interface EmpresaInstance extends Model<Empresa, EmpresaCreationAttributes>, Empresa {}

export const Empresa = sequelize.define<EmpresaInstance, Empresa>("Empresa", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  codigo: {
    allowNull: false,
    type: DataTypes.STRING,
  },
});
