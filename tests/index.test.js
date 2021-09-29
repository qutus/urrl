const request = require('supertest');

const app = require('../src');

describe('Yes test', () => {
    it('should return true', () => {
        expect(true);
    });

    it('supertest should hit the server on /test route and receive "success" string', async () => {
        await request(app)
            .get('/test')
            .expect(200)
            .then(response => {
                expect(response.body).toEqual({ status: "success" })
            });
    });

    it('supertest should hit the server on / route and receive 404 status code', async () => {
        await request(app)
            .get('/')
            .expect(404);
    });
});