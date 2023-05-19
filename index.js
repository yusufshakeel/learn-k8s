'use strict';
const configService = require('./src/services/config-service')();
const Server = require('./src/server');
const fastify = require('fastify')({
  logger: configService.fastify.logger,
  keepAliveTimeout: configService.fastify.keepAliveTimeout
});
new Server({ fastify }).setup().then(server => server.start());
