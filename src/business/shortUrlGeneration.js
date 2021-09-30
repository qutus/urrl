const { InvalidUrlError } = require('../errors');
const { generateShortUrl, isUrlRfcCompliant } = require("../utils/url")
const { generateShortUrlId } = require('../utils/idGenerator');
const { insertUrlGeneration } = require('../db/generatedUrl');

async function generateShortUrlLinkedToValidOriginalUrl(originalUrl) {
    if(!isUrlRfcCompliant(originalUrl)) {
        throw new InvalidUrlError(originalUrl);
    }

    const shortUrlId = generateShortUrlId();
    const shortUrl = generateShortUrl(shortUrlId);

    const { originalUrl: _originalUrl, shortUrl: _shortUrl } = await insertUrlGeneration(originalUrl, shortUrl, shortUrlId);

    return { originalUrl: _originalUrl, shortUrl: _shortUrl };
}

module.exports = {
    generateShortUrlLinkedToValidOriginalUrl
}