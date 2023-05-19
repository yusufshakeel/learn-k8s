'use strict';

const {
  responseSchema,
  readinessUnhealthyRequestBodySchema,
  livenessUnhealthyRequestBodySchema
} = require('../schemas/health-route-response-schema');
const { READINESS_STATUS, LIVENESS_STATUS, UNHEALTHY } = require('../configs/cors-config');

module.exports = async function HealthRoutes(fastify, services) {
  fastify.route({
    method: 'GET',
    url: '/liveness',
    schema: {
      tags: ['Health Check'],
      description: 'Check for liveness',
      response: {
        200: responseSchema,
        500: responseSchema
      }
    },
    handler: async function (request, reply) {
      if ((await services.cacheService.get(LIVENESS_STATUS)) === UNHEALTHY) {
        reply.code(500).send({ data: { message: 'I am not live!' } });
      } else {
        reply.code(200).send({ data: { message: 'I am live!' } });
      }
    }
  });

  fastify.route({
    method: 'GET',
    url: '/readiness',
    schema: {
      tags: ['Health Check'],
      description: 'Check for readiness',
      response: {
        200: responseSchema,
        500: responseSchema
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
      const ttl = parseInt(request.body?.data?.ttl || 60);
      services.cacheService.set(READINESS_STATUS, UNHEALTHY, ttl);
      reply.code(200).send({ data: { message: 'I am unhealthy!' } });
    }
  });

  fastify.route({
    method: 'PUT',
    url: '/liveness/make/unhealthy',
    schema: {
      tags: ['Health Check'],
      description: 'Make liveness unhealthy.',
      body: livenessUnhealthyRequestBodySchema,
      response: {
        200: responseSchema
      }
    },
    handler: async function (request, reply) {
      const ttl = parseInt(request.body?.data?.ttl || 60);
      services.cacheService.set(LIVENESS_STATUS, UNHEALTHY, ttl);
      reply.code(200).send({ data: { message: 'I am unhealthy!' } });
    }
  });

  return fastify;
};
