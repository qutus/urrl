describe('url', () => {
    describe('with default configuration', () => {
        it('should return following url => http://localhost:8080/api/shorturl/g6j545gfhj', () => {
            jest.resetModules();
            const urlGenerator = require('../../src/utils/url');

            const generatedUrl = urlGenerator.generateShortUrl('g6j545gfhj');

            expect(generatedUrl).toEqual('http://localhost:8080/api/shorturl/g6j545gfhj');
        });

        it('should return following url => http://localhost:8080/api/shorturl/CDOIJFOSFJ', () => {
            jest.resetModules();
            const urlGenerator = require('../../src/utils/url');

            const generatedUrl = urlGenerator.generateShortUrl('CDOIJFOSFJ');

            expect(generatedUrl).toEqual('http://localhost:8080/api/shorturl/CDOIJFOSFJ');
        });
    });
    
    describe('with mocked baseGeneratedUrl config', () => {
        it('should return following url => http://localhost:8080/api/shorturl/NUHnNt', () => {
            jest.resetModules();
            const urlGenerator = require('../../src/utils/url');
            jest.mock('../../src/config', () => ({ 
                urlGenerator: { 
                    ...jest.requireActual('../../src/config').urlGenerator, 
                    baseGeneratedUrl: "test"
                }
            }));

            const generatedUrl = urlGenerator.generateShortUrl('42');
            expect(generatedUrl).toEqual('test/42');
        });
    });
});