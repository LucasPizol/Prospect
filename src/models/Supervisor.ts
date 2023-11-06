// src/models/User.ts

import { sequelize } from "../database";
import { DataTypes, Model, Optional } from "sequelize";
import bcrypt from "bcrypt";

export interface Supervisor {
  id: number;
  nome: string;
  sobrenome: string;
  codigo: string;
  password: string;
  email: string;
  EmpresaId: number;
}

export interface SupervisorCreationAttributes extends Optional<Supervisor, "id"> {}

export interface SupervisorInstance extends Model<Supervisor, SupervisorCreationAttributes>, Supervisor {}

export const Supervisor = sequelize.define<SupervisorInstance, Supervisor>(
  "Supervisor",
  {
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
    nome: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    sobrenome: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    EmpresaId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: "Empresas", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
  },
  {
    hooks: {
      beforeSave: async (user) => {
        if (user.isNewRecord || user.changed("password")) {
          user.password = await bcrypt.hash(user.password.toString(), 10);
        }
      },
    },
  }
);
