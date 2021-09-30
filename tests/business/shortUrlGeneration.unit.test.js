describe('shortUrlGeneration', () => {
    describe('generateShortUrlLinkedToValidOriginalUrl', () => {
        it('should return an shortUrlGeneration with originalUrl(www.bazinga.com) and mocked shortUrl(www.t.com) if isUrlRfcCompliant return true', async () => {
            jest.resetModules();
            jest.mock('../../src/utils/url', () => ({
                generateShortUrl: () => 'www.t.com', 
                isUrlRfcCompliant: () => true
            }));
            jest.mock('../../src/db/generatedUrl', () => ({
                insertUrlGeneration: (originalUrl, shortUrl) => ({ originalUrl, shortUrl })
            }));
            const { generateShortUrlLinkedToValidOriginalUrl } = require('../../src/business/shortUrlGeneration');

            const shortUrlGeneration = await generateShortUrlLinkedToValidOriginalUrl('www.bazinga.com');
            expect(shortUrlGeneration).toEqual({ originalUrl: 'www.bazinga.com', shortUrl: 'www.t.com' });
        });

        it('should return an shortUrlGeneration with originalUrl(www.dow.com) and mocked shortUrl(www.g.com) if isUrlRfcCompliant return true', async () => {
            jest.resetModules();
            jest.mock('../../src/utils/url', () => ({
                generateShortUrl: () => 'www.g.com', 
                isUrlRfcCompliant: () => true
            }));
            jest.mock('../../src/db/generatedUrl', () => ({
                insertUrlGeneration: (originalUrl, shortUrl) => ({ originalUrl, shortUrl })
            }));
            const { generateShortUrlLinkedToValidOriginalUrl } = require('../../src/business/shortUrlGeneration');

            const shortUrlGeneration = await generateShortUrlLinkedToValidOriginalUrl('www.dow.com');
            expect(shortUrlGeneration).toEqual({ originalUrl: 'www.dow.com', shortUrl: 'www.g.com' });
        });

        it('should throw an InvalidUrlError if isUrlRfcCompliant return false', async () => {
            jest.resetModules();
            const { InvalidUrlError } = require('../../src/errors');
            jest.mock('../../src/utils/url', () => ({
                isUrlRfcCompliant: () => false
            }));

            const { generateShortUrlLinkedToValidOriginalUrl } = require('../../src/business/shortUrlGeneration');

            await expect(generateShortUrlLinkedToValidOriginalUrl('nawak'))
                .rejects
                .toThrowError(InvalidUrlError);
        });
    });
});