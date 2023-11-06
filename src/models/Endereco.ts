import { sequelize } from "../database";
import { DataTypes, Model, Optional } from "sequelize";
export interface Endereco {
  id: number;
  logradouro: string;
  cep: string;
  bairro: string;
  cidade: string;
  numero: number;
  uf: string;
}

export interface EnderecoCreationAttributes extends Optional<Endereco, "id"> {}

export interface EnderecoInstance extends Model<Endereco, EnderecoCreationAttributes>, Endereco {}

export const Endereco = sequelize.define<EnderecoInstance, Endereco>("Endereco", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  logradouro: {
    allowNull: true,
    type: DataTypes.TEXT,
  },
  cep: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  bairro: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  cidade: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  numero: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  uf: {
    allowNull: true,
    type: DataTypes.STRING,
  },
});
