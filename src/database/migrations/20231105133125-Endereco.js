"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Enderecos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      logradouro: {
        allowNull: true,
        type: Sequelize.DataTypes.TEXT,
      },
      cep: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING,
      },
      bairro: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING,
      },
      cidade: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      numero: {
        allowNull: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      uf: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Enderecos");
  },
};
