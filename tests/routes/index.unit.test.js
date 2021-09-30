describe('routes', () => {
    describe('mountRoutes', () => {
        it('should mount all routes of the project', () => {
            const mountRoutes = require('../../src/routes');
            const { postGenerateShortUrl } = require('../../src/handlers/shortUrlGeneration');
            const { getRedirectedToOriginalUrl } = require('../../src/handlers/shortUrlProcessing');
            
            const mockPost = jest.fn();
            const mockGet = jest.fn();
            const mockApp = {
                post: mockPost,
                get: mockGet
            };
    
            mountRoutes(mockApp);
            expect(mockPost).toHaveBeenCalledWith('/api/shorturl', postGenerateShortUrl);
            expect(mockGet).toHaveBeenCalledWith('/api/shorturl/:shortUrlId', getRedirectedToOriginalUrl);
        });
    });
});