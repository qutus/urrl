const request = require('supertest');
const fs = require('fs');

describe('End to end testing', () => {
    it('Scenario 1', async () => {
        jest.resetModules();
        fs.rmdirSync('test_data', { recursive: true });

        jest.mock('../src/config', () => ({ 
            ...jest.requireActual('../src/config'),
            db: { 
                ...jest.requireActual('../src/config').db, 
                path: "test_data"
            }
        }));

        const app = require('../src');

        const postUrlRes1 = await request(app)
            .post('/api/shorturl')
            .send({ originalUrl: 'http://lunii.com'})
            .set('Accept', 'application/json')
            .expect(200);
        const generatedUrl1 = postUrlRes1.body;

        const postUrlRes2 = await request(app)
        .post('/api/shorturl')
        .send({ originalUrl: 'http://lunii.fr'})
        .set('Accept', 'application/json')
        .expect(200);
        const generatedUrl2 = postUrlRes2.body;

        const getAnalyticsRes1 = await request(app)
            .get('/api/shorturl/analytics')
            .expect(200);
        const expectedReport = [generatedUrl1, generatedUrl2].map(generatedUrl => ({ ...generatedUrl, analytics: { redirectionCount: 0 }}));
        expect(getAnalyticsRes1.body).toEqual(expect.arrayContaining(expectedReport));

        const shortUrlPath1 = generatedUrl1.shortUrl.substring(generatedUrl1.shortUrl.indexOf('/api/shorturl/'));
        const shortUrlPath2 = generatedUrl2.shortUrl.substring(generatedUrl2.shortUrl.indexOf('/api/shorturl/'));

        await request(app)
            .get(shortUrlPath1)
            .expect(302)
            .expect('Location', 'http://lunii.com');

        await request(app)
            .get(shortUrlPath1)
            .expect(302)
            .expect('Location', 'http://lunii.com');

        expectedReport[0].analytics.redirectionCount = 2;
        const getAnalyticsRes2 = await request(app)
            .get('/api/shorturl/analytics')
            .expect(200);
        expect(getAnalyticsRes2.body).toEqual(expect.arrayContaining(expectedReport));

        await request(app)
            .get(shortUrlPath2)
            .expect(302)
            .expect('Location', 'http://lunii.fr');

        expectedReport[1].analytics.redirectionCount = 1;
        const getAnalyticsRes3 = await request(app)
            .get('/api/shorturl/analytics')
            .expect(200);
        expect(getAnalyticsRes3.body).toEqual(expect.arrayContaining(expectedReport));

        fs.rmdirSync('test_data', { recursive: true });
    });
});