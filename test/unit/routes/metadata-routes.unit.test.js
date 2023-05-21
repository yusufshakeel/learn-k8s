'use strict';
const fastify = require('fastify')();
const MetadataRoutes = require('../../../src/routes/metadata-routes');

describe('Testing metadata routes', () => {
  beforeAll(async () => {
    await MetadataRoutes(fastify);
  });

  test('Should be able to call the metadata api endpoint', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/metadata'
    });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toStrictEqual({
      data: {
        cpus: expect.any(Object),
        hostname: expect.any(String),
        memory: {
          quantity: expect.any(String),
          unit: expect.any(String)
        },
        os: expect.any(String),
        uptime: {
          quantity: expect.any(String),
          unit: expect.any(String)
        }
      }
    });
  });
});
