'use strict';
const { promisify } = require('util');
const promisifySetTimeout = promisify(setTimeout);

module.exports = async function delay(timeInMilliSeconds) {
  await promisifySetTimeout(timeInMilliSeconds);
};
