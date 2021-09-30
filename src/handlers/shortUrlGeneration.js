const { InvalidUrlError } = require('../errors');
const { generateShortUrlLinkedToValidOriginalUrl } = require('../business/shortUrlGeneration');


async function postGenerateShortUrl(req, res, next) {
    const { originalUrl } = req.body;

    try {
        const shortUrlGeneration = await generateShortUrlLinkedToValidOriginalUrl(originalUrl);

        res.send({ 
            originalUrl: shortUrlGeneration.originalUrl, 
            shortUrl: shortUrlGeneration.shortUrl 
        });
    } catch (error) {
        if(error instanceof InvalidUrlError) {
            res.status(409).send({ error: 'invalid URL' });
        } else {
            res.sendStatus(400);
        }
    }
    
}

module.exports = {
    postGenerateShortUrl
};