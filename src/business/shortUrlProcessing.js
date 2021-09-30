const { UnknownShortUrlError } = require('../errors');
const { findUrlGenerationByShortUrlId } = require('../db/generatedUrl');

async function getOriginalUrlFromShortUrlId(shortUrlId) {
    const shortUrlGeneration = await findUrlGenerationByShortUrlId(shortUrlId);

    if(!shortUrlGeneration) {
        throw new UnknownShortUrlError();
    }

    return shortUrlGeneration.originalUrl;
}

module.exports = {
    getOriginalUrlFromShortUrlId
}