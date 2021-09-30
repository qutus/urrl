describe('shortUrlProcessing', () => {
    describe('getOriginalUrlFromShortUrlId', () => {
        it('should return originalUrl if found one', async () => {
            jest.resetModules();

            jest.mock('../../src/db/generatedUrl', () => ({
                findUrlGenerationByShortUrlId: (shortUrlId) => shortUrlId === 'test' ? { originalUrl: 'http://lunii.com' } : null
            }));
            const { getOriginalUrlFromShortUrlId } = require('../../src/business/shortUrlProcessing');

            const originalUrl = await getOriginalUrlFromShortUrlId('test');
            expect(originalUrl).toEqual('http://lunii.com');
        });

        it('should throw UnknownShortUrlError if originalUrl linked to shortUrlId not found', async () => {
            jest.resetModules();

            jest.mock('../../src/db/generatedUrl', () => ({
                findUrlGenerationByShortUrlId: (shortUrlId) => null
            }));
            const { UnknownShortUrlError } = require('../../src/errors');
            const { getOriginalUrlFromShortUrlId } = require('../../src/business/shortUrlProcessing');

            await expect(getOriginalUrlFromShortUrlId('test')).rejects.toThrowError(UnknownShortUrlError);
        });

       
    });
});