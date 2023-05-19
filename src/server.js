'use strict';
const fastifyCors = require('@fastify/cors');
const fastifyHelmet = require('@fastify/helmet');
const fastifyMetrics = require('fastify-metrics');
const Services = require('./services');
const corsConfig = require('./configs/cors-config');
const Routes = require('./routes');

module.exports = function Server({ fastify }) {
  const self = this;
  const services = new Services();
  const routes = Routes({ fastify });

  this.setup = async () => {
    await fastify.register(fastifyCors, corsConfig);
    await fastify.register(fastifyHelmet);
    await fastify.register(fastifyMetrics, { endpoint: '/metrics' });
    await fastify.register(routes.HomeRoutes);
    await fastify.register(routes.HealthCheckRoutes);
    await fastify.register(routes.MetadataRoutes);
    await fastify.register(routes.VersionRoutes, services);
    return self;
  };

  this.start = async () => {
    const {
      configService: {
        fastify: { port, host }
      }
    } = services;
    fastify.listen({ port, host }, function (err) {
      if (err) {
        fastify.log.error(err);
        throw err;
      }
    });
  };
};
