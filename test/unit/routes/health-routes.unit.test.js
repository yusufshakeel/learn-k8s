'use strict';
const FastifyModule = require('fastify');
const HealthRoutes = require('../../../src/routes/health-routes');
const { UNHEALTHY } = require('../../../src/contants');
const delay = require('../../helper/delay');

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
      test('Should return 503', async () => {
        const fastifyInstance = FastifyModule();
        await HealthRoutes(fastifyInstance, {
          cacheService: { set: jest.fn(), del: jest.fn(), get: jest.fn(() => UNHEALTHY) }
        });
        const response = await fastifyInstance.inject({
          method: 'GET',
          url: '/liveness'
        });
        expect(response.statusCode).toBe(503);
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
      test('Should return 503', async () => {
        const fastifyInstance = FastifyModule();
        await HealthRoutes(fastifyInstance, {
          cacheService: { set: jest.fn(), del: jest.fn(), get: jest.fn(() => UNHEALTHY) }
        });
        const response = await fastifyInstance.inject({
          method: 'GET',
          url: '/readiness'
        });
        expect(response.statusCode).toBe(503);
        expect(response.json()).toStrictEqual({ data: { message: 'I am not ready!' } });
      });
    });
  });

  test('Should be able to call the readiness make unhealthy api endpoint', async () => {
    const response = await fastify.inject({
      method: 'PUT',
      url: '/readiness/make/unhealthy',
      payload: {}
    });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toStrictEqual({ data: { message: 'I am unhealthy!' } });
  });

  test('Should be able to call the liveness make unhealthy api endpoint', async () => {
    const response = await fastify.inject({
      method: 'PUT',
      url: '/liveness/make/unhealthy',
      payload: {}
    });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toStrictEqual({ data: { message: 'I am unhealthy!' } });
  });

  describe('Testing die api endpoint', () => {
    test('Should able to kill pod', async () => {
      const fastifyInstance = FastifyModule();
      await HealthRoutes(fastifyInstance, {
        cacheService: { set: jest.fn(), del: jest.fn(), get: jest.fn() }
      });
      const response = await fastifyInstance.inject({
        method: 'POST',
        url: '/die'
      });
      expect(response.statusCode).toBe(200);
      expect(response.json()).toStrictEqual({ data: { message: 'Goodbye...' } });

      await delay(4000);

      await expect(() =>
        fastifyInstance.inject({
          method: 'GET',
          url: '/liveness'
        })
      ).rejects.toThrow();
    });
  });
});
