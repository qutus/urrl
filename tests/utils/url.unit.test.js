describe('url', () => {
    describe('isUrlRfcCompliant', () => {
        it('should return true on valid url(http://www.lunii.com)', () => {
            jest.resetModules();

            const { isUrlRfcCompliant } = require('../../src/utils/url');

            expect(isUrlRfcCompliant('http://www.lunii.com')).toBeTruthy();
        });

        it('should return true on valid url(ftp://www.lunii.com)', () => {
            jest.resetModules();

            const { isUrlRfcCompliant } = require('../../src/utils/url');

            expect(isUrlRfcCompliant('ftp://www.lunii.com')).toBeTruthy();
        });

        it('should return true on valid url(ftp://www.lunii.com.ok.anotherOne.hereisthetld)', () => {
            jest.resetModules();

            const { isUrlRfcCompliant } = require('../../src/utils/url');

            expect(isUrlRfcCompliant('ftp://www.lunii.com.ok.anotherOne.hereisthetld')).toBeTruthy();
        });

        it('should return false on invalid url(www.lunii.com)', () => {
            jest.resetModules();

            const { isUrlRfcCompliant } = require('../../src/utils/url');

            expect(isUrlRfcCompliant('www.lunii.com')).toBeFalsy();
        });

        it('should return false on invalid url(test)', () => {
            jest.resetModules();

            const { isUrlRfcCompliant } = require('../../src/utils/url');

            expect(isUrlRfcCompliant('test')).toBeFalsy();
        });
    });

    describe('generateShortUrl', () => {
        describe('with default configuration', () => {
            it('should return following url => http://localhost:8080/api/shorturl/g6j545gfhj', () => {
                jest.resetModules();
                const { generateShortUrl } = require('../../src/utils/url');
    
                const generatedUrl = generateShortUrl('g6j545gfhj');
    
                expect(generatedUrl).toEqual('http://localhost:8080/api/shorturl/g6j545gfhj');
            });
    
            it('should return following url => http://localhost:8080/api/shorturl/CDOIJFOSFJ', () => {
                jest.resetModules();
                const { generateShortUrl } = require('../../src/utils/url');
    
                const generatedUrl = generateShortUrl('CDOIJFOSFJ');
    
                expect(generatedUrl).toEqual('http://localhost:8080/api/shorturl/CDOIJFOSFJ');
            });
        });
        
        describe('with mocked baseGeneratedUrl config', () => {
            it('should return following url => http://localhost:8080/api/shorturl/NUHnNt', () => {
                jest.resetModules();
                const { generateShortUrl } = require('../../src/utils/url');
                jest.mock('../../src/config', () => ({ 
                    urlGenerator: { 
                        ...jest.requireActual('../../src/config').urlGenerator, 
                        baseGeneratedUrl: "test"
                    }
                }));
    
                const generatedUrl = generateShortUrl('42');
                expect(generatedUrl).toEqual('test/42');
            });
        });
    });
});