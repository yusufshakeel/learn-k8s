'use strict';
const ConfigService = require('./config-service');
const CacheService = require('./cache-service');
module.exports = function Services() {
  this.configService = ConfigService();
  this.cacheService = CacheService();
};
