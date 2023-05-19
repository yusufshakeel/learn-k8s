'use strict';

const responseSchema = require('../schemas/version-route-response-schema');

module.exports = async function HomeRoutes(fastify, service) {
  fastify.route({
    method: 'GET',
    url: '/version',
    schema: {
      tags: ['APIs'],
      description: 'The version route.',
      response: {
        200: responseSchema
      }
    },
    handler: async function (request, reply) {
      reply.code(200).send({ data: { version: service.configService.application.version } });
    }
  });

  return fastify;
};
