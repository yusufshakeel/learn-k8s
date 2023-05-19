'use strict';
const HomeRoutes = require('./home-routes');
const HealthCheckRoutes = require('./health-routes');
const MetadataRoutes = require('./metadata-routes');
const VersionRoutes = require('./version-routes');

module.exports = function Routes() {
  return { HomeRoutes, HealthCheckRoutes, MetadataRoutes, VersionRoutes };
};
