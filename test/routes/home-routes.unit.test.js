'use strict';
const fastify = require('fastify')();
const HomeRoutes = require('../../src/routes/home-routes');

describe('Testing home routes', () => {
  beforeAll(async () => {
    await HomeRoutes(fastify);
  });

  test('Should be able to call the home api endpoint', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/'
    });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toStrictEqual({ data: { message: 'Hello, World!' } });
  });
});
