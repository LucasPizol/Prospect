"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Pesquisas", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      nomeCliente: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      cidade: {
        allowNull: false,
        type: Sequelize.DataTypes.TEXT,
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
    await queryInterface.dropTable("Pesquisas");
  },
};
