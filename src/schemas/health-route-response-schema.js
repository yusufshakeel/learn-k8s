'use strict';

const responseSchema = {
  type: 'object',
  properties: {
    data: {
      type: 'object',
      properties: {
        message: { type: 'string' }
      }
    }
  }
};

const readinessUnhealthyRequestBodySchema = {
  type: 'object',
  properties: {
    data: {
      type: 'object',
      properties: {
        ttl: { type: 'number', description: 'In seconds.', ['default']: 60 }
      }
    }
  }
};

const livenessUnhealthyRequestBodySchema = {
  type: 'object',
  properties: {
    data: {
      type: 'object',
      properties: {
        ttl: { type: 'number', description: 'In seconds.', ['default']: 60 }
      }
    }
  }
};

module.exports = {
  responseSchema,
  readinessUnhealthyRequestBodySchema,
  livenessUnhealthyRequestBodySchema
};
