describe('shortUrlGeneration', () => {
    describe('postGenerateShortUrl', () => {
        it('Should send an url generation without error', async () => {
            jest.resetModules();
            jest.mock('../../src/business/shortUrlGeneration', () => ({
                generateShortUrlLinkedToValidOriginalUrl: (originalUrl) => ({ originalUrl, shortUrl: 'test2' })
            }));
            const { postGenerateShortUrl } = require('../../src/handlers/shortUrlGeneration');
    
            const mockReq = {
                body: { originalUrl: 'test1' }
            };
            
            const mockSendFunction = jest.fn();
            const mockRes = {
                send: mockSendFunction
            };
    
            await postGenerateShortUrl(mockReq, mockRes);
    
            expect(mockSendFunction).toHaveBeenCalledWith({ originalUrl: 'test1', shortUrl: 'test2' });
        });

        it('Should send a 409 status and an error message on invalid originalUrl throw', async () => {
            jest.resetModules();
            
            const { InvalidUrlError } = require('../../src/errors');
            const mockInvalidUrlErrorFunction = () => { throw new InvalidUrlError('test'); };
            jest.mock('../../src/business/shortUrlGeneration', () => ({
                generateShortUrlLinkedToValidOriginalUrl: mockInvalidUrlErrorFunction
            }));
            const { postGenerateShortUrl } = require('../../src/handlers/shortUrlGeneration');
    
            const mockReq = {
                body: { originalUrl: 'test1' }
            };
            
            const mockSendFunction = jest.fn();
            const mockStatusFunction = jest.fn(() => ({
                send: mockSendFunction
            }));
            const mockRes = {
                status: mockStatusFunction
            };
    
            await postGenerateShortUrl(mockReq, mockRes);
    
            expect(mockStatusFunction).toHaveBeenCalledWith(409);
            expect(mockSendFunction).toHaveBeenCalledWith({ error: 'invalid URL' });
        });

        it('Should send a 400 status and an error message on other errors throw', async () => {
            jest.resetModules();
            
            const mockInvalidUrlErrorFunction = () => { throw new Error(); };
            jest.mock('../../src/business/shortUrlGeneration', () => ({
                generateShortUrlLinkedToValidOriginalUrl: mockInvalidUrlErrorFunction
            }));
            const { postGenerateShortUrl } = require('../../src/handlers/shortUrlGeneration');
    
            const mockReq = {
                body: { originalUrl: 'test1' }
            };
            
            const mockSendStatusFunction = jest.fn();
            const mockRes = {
                sendStatus: mockSendStatusFunction
            };
    
            await postGenerateShortUrl(mockReq, mockRes);
    
            expect(mockSendStatusFunction).toHaveBeenCalledWith(400);
        });
    });
});