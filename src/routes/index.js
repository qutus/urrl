const analyticsRoutes = require('./analytics');
const urlGenerationRoutes = require('./shortUrlGeneration');
const shortUrlProcessingRoutes = require('./shortUrlProcessing');

const routes = [
    ...analyticsRoutes,
    ...urlGenerationRoutes,
    ...shortUrlProcessingRoutes,
];

function mountRoutes(app) {
    routes.forEach(route => {
        app[route.method](route.path, route.handler);
    });
}

module.exports = mountRoutes;