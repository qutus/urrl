const urlGenerationRoutes = require('./shortUrlGeneration');
const shortUrlProcessing = require('./shortUrlProcessing');

const routes = [
    ...urlGenerationRoutes,
    ...shortUrlProcessing,
];

function mountRoutes(app) {
    routes.forEach(route => {
        app[route.method](route.path, route.handler);
    });
}

module.exports = mountRoutes;