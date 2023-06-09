'use strict';

const responseSchema = {
  type: 'object',
  properties: {
    data: {
      type: 'object',
      properties: {
        version: { type: 'string' }
      }
    }
  }
};

module.exports = responseSchema;
