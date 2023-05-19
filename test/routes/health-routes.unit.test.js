'use strict';
const fastify = require('fastify')();
const HealthRoutes = require('../../src/routes/health-routes');

describe('Testing health routes', () => {
  beforeAll(async () => {
    await HealthRoutes(fastify);
  });

  test('Should be able to call the liveness api endpoint', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/liveness'
    });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toStrictEqual({ data: { message: 'I am alive!' } });
  });

  test('Should be able to call the readiness api endpoint', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/readiness'
    });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toStrictEqual({ data: { message: 'I am ready!' } });
  });
});
