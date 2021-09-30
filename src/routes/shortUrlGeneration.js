const { postGenerateShortUrl } = require('../handlers/shortUrlGeneration');

const routes = [
    {
        method: 'post',
        path: '/api/shorturl',
        handler: postGenerateShortUrl
    }
];

module.exports = routes;