"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Prospects", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      nome: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      descricao: {
        allowNull: false,
        type: Sequelize.DataTypes.TEXT,
      },
      finalizado: {
        type: Sequelize.DataTypes.BOOLEAN,
      },
      telefone: {
        defaultValue: false,
        type: Sequelize.DataTypes.STRING,
      },
      EnderecoId: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        onUpdate: "CASCADE",
      },
      UserId: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        onUpdate: "CASCADE",
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
    await queryInterface.dropTable("Prospects");
  },
};
