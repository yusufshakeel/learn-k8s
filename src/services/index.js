'use strict';
const ConfigService = require('./config-service');
module.exports = function Services() {
  this.configService = ConfigService();
};
