describe('analytics', () => {
    describe('onShortUrlRedirection', () => {
        it('should call increaseUrlGenerationAnalyticRedirectionCountByShortUrlId', async () => {
            jest.resetModules();
            jest.mock('../../src/db/generatedUrl', () => ({
                increaseUrlGenerationAnalyticRedirectionCountByShortUrlId: async () => { return; }
            }));

            const { onShortUrlRedirection } = require('../../src/services/analytics');

            await expect(onShortUrlRedirection()).resolves;
        });

        it('should call increaseUrlGenerationAnalyticRedirectionCountByShortUrlId', async () => {
            jest.resetModules();
            jest.mock('../../src/db/generatedUrl', () => ({
                increaseUrlGenerationAnalyticRedirectionCountByShortUrlId: async () => { throw new Error(); }
            }));

            const { onShortUrlRedirection } = require('../../src/services/analytics');

            await expect(onShortUrlRedirection()).rejects;
        });
    });
});