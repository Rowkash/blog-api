'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'lastName');
  },

  down: async (queryInterface, Sequelize) => {},
};
