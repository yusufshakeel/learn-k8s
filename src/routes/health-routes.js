'use strict';

const {
  responseSchema,
  readinessUnhealthyRequestBodySchema
} = require('../schemas/health-route-response-schema');
const { READINESS_STATUS, UNHEALTHY } = require('../configs/cors-config');

module.exports = async function HealthRoutes(fastify, services) {
  fastify.route({
    method: 'GET',
    url: '/liveness',
    schema: {
      tags: ['Health Check'],
      description: 'Check for liveness',
      response: {
        200: responseSchema
      }
    },
    handler: async function (request, reply) {
      reply.code(200).send({ data: { message: 'I am alive!' } });
    }
  });

  fastify.route({
    method: 'GET',
    url: '/readiness',
    schema: {
      tags: ['Health Check'],
      description: 'Check for readiness',
      response: {
        200: responseSchema
      }
    },
    handler: async function (request, reply) {
      if ((await services.cacheService.get(READINESS_STATUS)) === UNHEALTHY) {
        reply.code(500).send({ data: { message: 'I am not ready!' } });
      } else {
        reply.code(200).send({ data: { message: 'I am ready!' } });
      }
    }
  });

  fastify.route({
    method: 'PUT',
    url: '/readiness/make/unhealthy',
    schema: {
      tags: ['Health Check'],
      description: 'Make readiness unhealthy.',
      body: readinessUnhealthyRequestBodySchema,
      response: {
        200: responseSchema
      }
    },
    handler: async function (request, reply) {
      const ttl = parseInt(request.body?.data?.ttl);
      services.cacheService.set(READINESS_STATUS, UNHEALTHY, ttl);
      reply.code(200).send({ data: { message: 'I am unhealthy!' } });
    }
  });

  return fastify;
};
