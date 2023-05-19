'use strict';
const FastifyModule = require('fastify');
const HealthRoutes = require('../../src/routes/health-routes');
const { UNHEALTHY } = require('../../src/configs/cors-config');

describe('Testing health routes', () => {
  let fastify;

  beforeAll(async () => {
    fastify = FastifyModule();
    await HealthRoutes(fastify, {
      cacheService: { set: jest.fn(), del: jest.fn(), get: jest.fn() }
    });
  });

  describe('Testing liveness api endpoint', () => {
    describe('When healthy', () => {
      test('Should return 200', async () => {
        const response = await fastify.inject({
          method: 'GET',
          url: '/liveness'
        });
        expect(response.statusCode).toBe(200);
        expect(response.json()).toStrictEqual({ data: { message: 'I am live!' } });
      });
    });

    describe('When unhealthy', () => {
      test('Should return 500', async () => {
        const fastifyInstance = FastifyModule();
        await HealthRoutes(fastifyInstance, {
          cacheService: { set: jest.fn(), del: jest.fn(), get: jest.fn(() => UNHEALTHY) }
        });
        const response = await fastifyInstance.inject({
          method: 'GET',
          url: '/liveness'
        });
        expect(response.statusCode).toBe(500);
        expect(response.json()).toStrictEqual({ data: { message: 'I am not live!' } });
      });
    });
  });

  describe('Testing readiness api endpoint', () => {
    describe('When healthy', () => {
      test('Should return 200', async () => {
        const response = await fastify.inject({
          method: 'GET',
          url: '/readiness'
        });
        expect(response.statusCode).toBe(200);
        expect(response.json()).toStrictEqual({ data: { message: 'I am ready!' } });
      });
    });

    describe('When unhealthy', () => {
      test('Should return 500', async () => {
        const fastifyInstance = FastifyModule();
        await HealthRoutes(fastifyInstance, {
          cacheService: { set: jest.fn(), del: jest.fn(), get: jest.fn(() => UNHEALTHY) }
        });
        const response = await fastifyInstance.inject({
          method: 'GET',
          url: '/readiness'
        });
        expect(response.statusCode).toBe(500);
        expect(response.json()).toStrictEqual({ data: { message: 'I am not ready!' } });
      });
    });
  });

  test('Should be able to call the readiness make unhealthy api endpoint', async () => {
    const response = await fastify.inject({
      method: 'PUT',
      url: '/readiness/make/unhealthy',
      payload: { data: { ttl: 10 } }
    });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toStrictEqual({ data: { message: 'I am unhealthy!' } });
  });

  test('Should be able to call the liveness make unhealthy api endpoint', async () => {
    const response = await fastify.inject({
      method: 'PUT',
      url: '/liveness/make/unhealthy',
      payload: { data: { ttl: 10 } }
    });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toStrictEqual({ data: { message: 'I am unhealthy!' } });
  });
});
