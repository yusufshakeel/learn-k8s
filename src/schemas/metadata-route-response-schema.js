'use strict';

const responseSchema = {
  type: 'object',
  properties: {
    data: {
      type: 'object',
      properties: {
        os: { type: 'string' },
        hostname: { type: 'string' },
        uptime: {
          type: 'object',
          properties: { unit: { type: 'string' }, quantity: { type: 'string' } }
        },
        memory: {
          type: 'object',
          properties: { unit: { type: 'string' }, quantity: { type: 'string' } }
        },
        cpus: {
          type: 'array'
        }
      }
    }
  }
};

module.exports = responseSchema;
