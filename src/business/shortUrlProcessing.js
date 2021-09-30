const { UnknownShortUrlError } = require('../errors');
const { findUrlGenerationByShortUriId } = require('../db/generatedUrl');

async function getOriginalUrlFromShortUrlId(shortUrlId) {
    const shortUrlGeneration = await findUrlGenerationByShortUriId(shortUrlId);

    if(!shortUrlGeneration) {
        throw new UnknownShortUrlError();
    }

    return shortUrlGeneration.originalUrl;
}

module.exports = {
    getOriginalUrlFromShortUrlId
}