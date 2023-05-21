'use strict';

const os = require('os');
const responseSchema = require('../schemas/home-route-response-schema');

module.exports = async function HomeRoutes(fastify) {
  fastify.route({
    method: 'GET',
    url: '/',
    schema: {
      tags: ['APIs'],
      description: 'The home route.',
      response: {
        200: responseSchema
      }
    },
    handler: async function (request, reply) {
      reply.code(200).send({ data: { message: 'Hello, World!', hostname: os.hostname() } });
    }
  });

  return fastify;
};
