const { increaseUrlGenerationAnalyticRedirectionCountByShortUrlId } = require('../db/generatedUrl');

async function onShortUrlRedirection(shortUrlId) {
    try {
        await increaseUrlGenerationAnalyticRedirectionCountByShortUrlId(shortUrlId);
    } catch(e) {
        console.error('analytics - onShortUrlRedirection', e);
    }
}

module.exports = {
    onShortUrlRedirection
}