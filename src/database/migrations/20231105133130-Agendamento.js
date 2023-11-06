"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Agendamentos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      dataVisita: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      dataFim: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      descricao: {
        allowNull: true,
        type: Sequelize.DataTypes.TEXT,
      },
      frequencia: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
      },
      codAgendamento: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      finalizado: {
        allowNull: false,
        type: Sequelize.DataTypes.BOOLEAN,
      },
      ProspectId: {
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
    await queryInterface.dropTable("Agendamentos");
  },
};
