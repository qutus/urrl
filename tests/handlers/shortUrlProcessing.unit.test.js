describe('shortUrlProcessing', () => {
    describe('getRedirectedToOriginalUrl', () => {
        it('Should return the user if shortUrlId match an originalUrl(http://www.lunii.com)', async () => {
            jest.resetModules();
            jest.mock('../../src/business/shortUrlProcessing', () => ({
                getOriginalUrlFromShortUrlId: (shortUrlId) => shortUrlId === 'test1' ? 'http://www.lunii.com' : null
            }));
            const { getRedirectedToOriginalUrl } = require('../../src/handlers/shortUrlProcessing');
    
            const mockReq = {
                params: { shortUrlId: 'test1' }
            };
            
            const mockRedirectFunction = jest.fn();
            const mockRes = {
                redirect: mockRedirectFunction
            };
    
            await getRedirectedToOriginalUrl(mockReq, mockRes);
    
            expect(mockRedirectFunction).toHaveBeenCalledWith('http://www.lunii.com');
        });

        it('Should return the user if shortUrlId match an originalUrl(http://www.google.com)', async () => {
            jest.resetModules();
            jest.mock('../../src/business/shortUrlProcessing', () => ({
                getOriginalUrlFromShortUrlId: (shortUrlId) => shortUrlId === 'test1' ? 'http://www.google.com' : null
            }));
            const { getRedirectedToOriginalUrl } = require('../../src/handlers/shortUrlProcessing');
    
            const mockReq = {
                params: { shortUrlId: 'test1' }
            };
            
            const mockRedirectFunction = jest.fn();
            const mockRes = {
                redirect: mockRedirectFunction
            };
    
            await getRedirectedToOriginalUrl(mockReq, mockRes);
    
            expect(mockRedirectFunction).toHaveBeenCalledWith('http://www.google.com');
        });

        it('Should return 400 status if getOriginalUrlFromShortUrlId throw UnknownShortUrlError', async () => {
            jest.resetModules();
            const { UnknownShortUrlError } = require('../../src/errors');
            const mockUnknownShortUrlFunction = () => { throw new UnknownShortUrlError('test'); };
            jest.mock('../../src/business/shortUrlProcessing', () => ({
                getOriginalUrlFromShortUrlId: mockUnknownShortUrlFunction
            }));
            const { getRedirectedToOriginalUrl } = require('../../src/handlers/shortUrlProcessing');
    
            const mockReq = {
                params: { shortUrlId: 'test1' }
            };
            
            const mockSendStatusFunction = jest.fn();
            const mockRes = {
                sendStatus: mockSendStatusFunction
            };
    
            await getRedirectedToOriginalUrl(mockReq, mockRes);
            
            expect(mockSendStatusFunction).toHaveBeenCalledWith(400);
        });
    });
});