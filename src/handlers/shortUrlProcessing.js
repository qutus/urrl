const { UnknownShortUrlError } = require('../errors');
const { getOriginalUrlFromShortUrlId } = require('../business/shortUrlProcessing');
const analyticsService = require('../services/analytics');

async function getRedirectedToOriginalUrl(req, res, next) {
    const { shortUrlId } = req.params;

    try {
        const originalUrl = await getOriginalUrlFromShortUrlId(shortUrlId);

        res.redirect(originalUrl);
    } catch (error) {
        if(error instanceof UnknownShortUrlError) {
            res.sendStatus(400);
        } else {
            res.sendStatus(400);
        }

        return;
    }
    next();

    analyticsService.onShortUrlRedirection(shortUrlId);
}

module.exports = {
    getRedirectedToOriginalUrl
};