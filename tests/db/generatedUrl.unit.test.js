describe('shortUrlGeneration', () => {
    describe('insertUrlGeneration', () => {
        it('Should resolve with inserted shortUrlGeneration if insertion worked properly', async () => {
            jest.resetModules();
            jest.mock('nedb', () => jest.fn().mockImplementation(() => {
                return { insert: (shortUrlGeneration, callback) => { callback(null, shortUrlGeneration); } };
            }));

            const { insertUrlGeneration } = require('../../src/db/generatedUrl');
            await expect(insertUrlGeneration('lol', 'l'))
                .resolves.toEqual({ originalUrl: 'lol', shortUrl: 'l' });
        });

        it('Should reject with error message if insertion did not worked properly', async () => {
            jest.resetModules();
            jest.mock('nedb', () => jest.fn().mockImplementation(() => {
                return { insert: (shortUrlGeneration, callback) => { callback('you failed !', null) } };
              }));

            const { insertUrlGeneration } = require('../../src/db/generatedUrl');
            await expect(insertUrlGeneration({ originalUrl: 'lol', shortUrl: 'l' })).rejects.toBe('you failed !');
        });
    });

    describe('findUrlGenerationByShortUriId', () => {
        it('Should resolve entry when finding one', async () => {
            jest.resetModules();
            jest.mock('nedb', () => jest.fn().mockImplementation(() => {
                return { findOne: (searchCriteria, callback) => { callback(null, searchCriteria.shortUrlId) } };
              }));

            const { findUrlGenerationByShortUriId } = require('../../src/db/generatedUrl');
            await expect(findUrlGenerationByShortUriId('lol')).resolves.toEqual('lol');
        });
        
        it('Should resolve if findOne didnt found an entry', async () => {
            jest.resetModules();
            jest.mock('nedb', () => jest.fn().mockImplementation(() => {
                return { findOne: (searchCriteria, callback) => { callback(null, null) } };
              }));

            const { findUrlGenerationByShortUriId } = require('../../src/db/generatedUrl');
            await expect(findUrlGenerationByShortUriId('lol')).resolves.toEqual(null);
        });

        it('Should reject with error message if findOne did not worked properly', async () => {
            jest.resetModules();
            jest.mock('nedb', () => jest.fn().mockImplementation(() => {
                return { findOne: (searchCriteria, callback) => { callback('you failed !', null) } };
              }));

            const { findUrlGenerationByShortUriId } = require('../../src/db/generatedUrl');
            await expect(findUrlGenerationByShortUriId('lol')).rejects.toBe('you failed !');
        });
    });
});