'use strict';
const NodeCache = require('node-cache');

module.exports = function CacheService(cache = new NodeCache()) {
  async function set(key, value, ttl) {
    return cache.set(key, value, ttl);
  }

  async function del(key) {
    return cache.del(key);
  }

  async function get(key) {
    return cache.get(key);
  }

  return { set, get, del };
};
