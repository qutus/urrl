const { getRedirectedToOriginalUrl } = require('../handlers/shortUrlProcessing');

const routes = [
    {
        method: 'get',
        path: '/api/shorturl/:shortUrlId',
        handler: getRedirectedToOriginalUrl
    }
];

module.exports = routes;