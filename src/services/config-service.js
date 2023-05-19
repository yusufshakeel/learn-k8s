'use strict';
const config = require('config');
const { ENABLED } = require('../contants');
module.exports = function () {
  const environment = config.get('environment');
  const nodeEnvironment = config.get('nodeEnvironment');
  const fastify = {
    keepAliveTimeout: config.get('fastify.keepAliveTimeout'),
    host: config.get('fastify.host'),
    port: config.get('fastify.port'),
    logger: config.get('fastify.loggerEnabled') === ENABLED
  };
  const application = {
    version: config.get('application.version')
  };
  return { environment, nodeEnvironment, fastify, application };
};
