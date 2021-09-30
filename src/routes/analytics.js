const { getAnalyticsGloablReport } = require('../handlers/analytics');

const routes = [
    {
        method: 'get',
        path: '/api/shorturl/analytics',
        handler: getAnalyticsGloablReport
    }
];

module.exports = routes;