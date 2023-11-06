import { Sequelize } from "sequelize";
const dotenv = require("dotenv");

dotenv.config();

export const sequelize = new Sequelize({
  dialect: "postgres",
  port: 5432,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
