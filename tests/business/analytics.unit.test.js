describe('analytics', () => {
    describe('generateAnalyticsGlobalReport', () => {
        it('should return data return mocked data(test) from findAllUrlGenerationForGlobalAnalyticReport', async () => {
            jest.resetModules();
            jest.mock('../../src/db/generatedUrl', () => ({
                findAllUrlGenerationForGlobalAnalyticReport: () => 'test'
            }));
            const { generateAnalyticsGlobalReport } = require('../../src/business/analytics');

            const shortUrlGeneration = await generateAnalyticsGlobalReport();
            expect(shortUrlGeneration).toEqual('test');
        });

        it('should return data return mocked data(another_test) from findAllUrlGenerationForGlobalAnalyticReport', async () => {
            jest.resetModules();
            jest.mock('../../src/db/generatedUrl', () => ({
                findAllUrlGenerationForGlobalAnalyticReport: () => 'another_test'
            }));
            const { generateAnalyticsGlobalReport } = require('../../src/business/analytics');

            const shortUrlGeneration = await generateAnalyticsGlobalReport();
            expect(shortUrlGeneration).toEqual('another_test');
        });
    });
});