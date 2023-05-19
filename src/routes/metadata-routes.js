'use strict';

const os = require('os');
const responseSchema = require('../schemas/metadata-route-response-schema');

module.exports = async function MetadataRoutes(fastify) {
  fastify.route({
    method: 'GET',
    url: '/metadata',
    schema: {
      tags: ['APIs'],
      description: 'The metadata route.',
      response: {
        200: responseSchema
      }
    },
    handler: async function (request, reply) {
      reply.code(200).send({
        data: {
          os: os.platform(),
          hostname: os.hostname(),
          uptime: { unit: 'sec', quantity: os.uptime() },
          memory: { unit: 'bytes', quantity: os.totalmem() },
          cpus: os.cpus()
        }
      });
    }
  });

  return fastify;
};
