'use strict';

const responseSchema = {
  type: 'object',
  properties: {
    data: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        hostname: { type: 'string' }
      }
    }
  }
};

module.exports = responseSchema;
