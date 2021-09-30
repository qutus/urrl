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
            const mockNext = jest.fn();
    
            await getRedirectedToOriginalUrl(mockReq, mockRes, mockNext);
    
            expect(mockRedirectFunction).toHaveBeenCalledWith('http://www.lunii.com');
            expect(mockNext).toHaveBeenCalled();
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
            const mockNext = jest.fn();
    
            await getRedirectedToOriginalUrl(mockReq, mockRes, mockNext);
    
            expect(mockRedirectFunction).toHaveBeenCalledWith('http://www.google.com');
            expect(mockNext).toHaveBeenCalled();
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
            const mockNext = jest.fn();

            await getRedirectedToOriginalUrl(mockReq, mockRes, mockNext);
            
            expect(mockSendStatusFunction).toHaveBeenCalledWith(400);
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('Should send a 400 status and an error message on other errors throw', async () => {
            jest.resetModules();

            const mockUnknownShortUrlFunction = () => { throw new Error(); };
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
            const mockNext = jest.fn();

            await getRedirectedToOriginalUrl(mockReq, mockRes, mockNext);
            
            expect(mockSendStatusFunction).toHaveBeenCalledWith(400);
            expect(mockNext).not.toHaveBeenCalled();
        });
    });
});