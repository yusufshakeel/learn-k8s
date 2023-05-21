'use strict';
const fastify = require('fastify')();
const VersionRoutes = require('../../../src/routes/version-routes');

describe('Testing version routes', () => {
  beforeAll(async () => {
    await VersionRoutes(fastify, { configService: { application: { version: '0.1.0' } } });
  });

  test('Should be able to call the version api endpoint', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/version'
    });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toStrictEqual({ data: { version: '0.1.0' } });
  });
});
