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
        ttl: { type: 'number', description: 'In seconds.' }
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
        ttl: { type: 'number', description: 'In seconds.' }
      }
    }
  }
};

module.exports = {
  responseSchema,
  readinessUnhealthyRequestBodySchema,
  livenessUnhealthyRequestBodySchema
};
