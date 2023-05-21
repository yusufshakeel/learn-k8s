'use strict';

const fastifyModule = require('fastify');
const Server = require('../../src/server');

describe('Testing Server', () => {
  describe('Testing setup()', () => {
    test('Should be able to setup server', async () => {
      const fastify = fastifyModule();
      await expect(new Server({ fastify }).setup()).resolves.not.toThrow();
      await fastify.close();
    });
  });

  describe('Testing start()', () => {
    describe('When there is no error', () => {
      test('Should be able to start server', async () => {
        const fastify = {
          register: jest.fn(),
          listen: jest.fn((option, cb) => cb())
        };
        const server = await new Server({ fastify }).setup();
        await server.start();
        expect(fastify.listen).toHaveBeenCalledTimes(1);
      });
    });

    describe('When there is an error', () => {
      test('Should throw error', async () => {
        expect.assertions(2);
        const fastify = {
          log: { error: jest.fn() },
          register: jest.fn(),
          listen: jest.fn((option, cb) => cb('someError'))
        };
        try {
          const server = await new Server({ fastify }).setup();
          await server.start();
        } catch (e) {
          expect(e).toBe('someError');
        }
        expect(fastify.listen).toHaveBeenCalledTimes(1);
      });
    });
  });
});
