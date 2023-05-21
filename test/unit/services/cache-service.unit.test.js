'use strict';
const CacheService = require('../../../src/services/cache-service');

describe('Testing cache service', () => {
  const set = jest.fn();
  const del = jest.fn();
  const get = jest.fn();
  const fakeCache = { set, get, del };
  const cacheService = new CacheService(fakeCache);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Should be able to call set', async () => {
    await cacheService.set('key1', 10, 20);
    expect(set).toHaveBeenCalledTimes(1);
    expect(set).toHaveBeenCalledWith('key1', 10, 20);
  });

  test('Should be able to call del', async () => {
    await cacheService.del('key1');
    expect(del).toHaveBeenCalledTimes(1);
  });

  test('Should be able to call get', async () => {
    await cacheService.get('key1');
    expect(get).toHaveBeenCalledTimes(1);
  });
});
