const { urlGenerator: urlGeneratorConfig } = require('../config');

function isUrlRfcCompliant(url) {
    try {
        new URL(url);
        return true;
    } catch (_) {
        return false;
    }
}

function generateShortUrl(id) {
    const url = `${urlGeneratorConfig.baseGeneratedUrl}/${id}`;

    return url;
}

module.exports = {
    isUrlRfcCompliant,
    generateShortUrl,
}