"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.removeColumn("products", "categgory");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("products", "categgory", {
      type: Sequelize.STRING(),
      allowNull: true,
      // Garante que o Sequelize não se perca com os timestamps padrão
      createdAt: "create_at",
      updatedAt: "updated_at",
    });
  },
};
