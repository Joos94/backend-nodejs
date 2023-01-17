'use strict';

const { OrderSchema, ORDER_TABLE } = require('../models/orderModel');
const { ORDER_PRODUCT_TABLE, OrderProductSchema } = require('../models/orderProductModel');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(ORDER_TABLE, OrderSchema);
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, OrderProductSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(ORDER_TABLE);
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE);

  }
};
