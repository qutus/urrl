describe('shortUrlGeneration', () => {
    describe('insertUrlGeneration', () => {
        it('should resolve with inserted shortUrlGeneration if insertion worked properly', async () => {
            jest.resetModules();
            jest.mock('nedb', () => jest.fn().mockImplementation(() => {
                return { insert: (shortUrlGeneration, callback) => { callback(null, shortUrlGeneration); } };
            }));

            const { insertUrlGeneration } = require('../../src/db/generatedUrl');

            await expect(insertUrlGeneration('lol', 'l'))
                .resolves.toEqual({ originalUrl: 'lol', shortUrl: 'l', analytics: { redirectionCount: 0 } });
        });

        it('should reject with error message if insertion did not worked properly', async () => {
            jest.resetModules();
            jest.mock('nedb', () => jest.fn().mockImplementation(() => {
                return { insert: (_, callback) => { callback('you failed !', null) } };
              }));

            const { insertUrlGeneration } = require('../../src/db/generatedUrl');

            await expect(insertUrlGeneration()).rejects.toBe('you failed !');
        });
    });

    describe('findUrlGenerationByShortUrlId', () => {
        it('should resolve entry when finding one', async () => {
            jest.resetModules();
            jest.mock('nedb', () => jest.fn().mockImplementation(() => {
                return { findOne: (searchCriteria, callback) => { callback(null, searchCriteria.shortUrlId) } };
              }));

            const { findUrlGenerationByShortUrlId } = require('../../src/db/generatedUrl');

            await expect(findUrlGenerationByShortUrlId('lol')).resolves.toEqual('lol');
        });
        
        it('should resolve if findOne didnt found an entry', async () => {
            jest.resetModules();
            jest.mock('nedb', () => jest.fn().mockImplementation(() => {
                return { findOne: (_, callback) => { callback(null, null) } };
              }));

            const { findUrlGenerationByShortUrlId } = require('../../src/db/generatedUrl');

            await expect(findUrlGenerationByShortUrlId('lol')).resolves.toEqual(null);
        });

        it('should reject with error message if findOne did not worked properly', async () => {
            jest.resetModules();
            jest.mock('nedb', () => jest.fn().mockImplementation(() => {
                return { findOne: (_, callback) => { callback('you failed !', null) } };
              }));

            const { findUrlGenerationByShortUrlId } = require('../../src/db/generatedUrl');

            await expect(findUrlGenerationByShortUrlId()).rejects.toBe('you failed !');
        });
    });

    describe('increaseUrlGenerationAnalyticRedirectionCountByShortUrlId', () => {
        it('should resolve incremented entries redirection count regarding shortUrlId(foo) criteria', async () => {
            jest.resetModules();
            jest.mock('nedb', () => jest.fn().mockImplementation(() => {
                return { update: (searchCriteria, _, callback) => { 
                    const matches = ['test', 'foo', '42',  'foo'].filter(value => value === searchCriteria.shortUrlId); 
                    callback(null, null, matches)
                }};
            }));

            const { increaseUrlGenerationAnalyticRedirectionCountByShortUrlId } = require('../../src/db/generatedUrl');

            await expect(increaseUrlGenerationAnalyticRedirectionCountByShortUrlId('foo')).resolves.toEqual(['foo', 'foo']);
        });

        it('should resolve incremented entries redirection count regarding shortUrlId(42) criteria', async () => {
            jest.resetModules();
            jest.mock('nedb', () => jest.fn().mockImplementation(() => {
                return { update: (searchCriteria, _, callback) => { 
                    const matches = ['test', 'foo', '42',  'foo'].filter(value => value === searchCriteria.shortUrlId); 
                    callback(null, null, matches)
                }};
            }));

            const { increaseUrlGenerationAnalyticRedirectionCountByShortUrlId } = require('../../src/db/generatedUrl');

            await expect(increaseUrlGenerationAnalyticRedirectionCountByShortUrlId('42')).resolves.toEqual(['42']);
        });

        it('should reject with error message if update did not worked properly', async () => {
            jest.resetModules();
            jest.mock('nedb', () => jest.fn().mockImplementation(() => {
                return { update: (_1, _2, callback) => { callback('you failed !') } };
              }));

            const { increaseUrlGenerationAnalyticRedirectionCountByShortUrlId } = require('../../src/db/generatedUrl');

            await expect(increaseUrlGenerationAnalyticRedirectionCountByShortUrlId()).rejects.toBe('you failed !');
        });
    });

    describe('findAllUrlGenerationForGlobalAnalyticReport', () => {
        it('should resolve entries when finding', async () => {
            jest.resetModules();
            jest.mock('nedb', () => jest.fn().mockImplementation(() => {
                return { find: (_1, _2, callback) => { callback(null, ['some', 'thing']) } };
              }));

            const { findAllUrlGenerationForGlobalAnalyticReport } = require('../../src/db/generatedUrl');
            await expect(findAllUrlGenerationForGlobalAnalyticReport('lol')).resolves.toEqual(['some', 'thing']);
        });

        it('should reject with error message if finding did not worked properly', async () => {
            jest.resetModules();
            jest.mock('nedb', () => jest.fn().mockImplementation(() => {
                return { find: (_1, _2, callback) => { callback('you failed !') } };
              }));

            const { findAllUrlGenerationForGlobalAnalyticReport } = require('../../src/db/generatedUrl');

            await expect(findAllUrlGenerationForGlobalAnalyticReport()).rejects.toBe('you failed !');
        });
    });
});