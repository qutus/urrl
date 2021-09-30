const api = {
    port: 8080,
    baseUrl: 'http://localhost:8080',
};

const idGenerator = {
    idLength: 6,
    characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
};

const urlGenerator = {
    baseGeneratedUrl: `${api.baseUrl}/api/shorturl`
};

const db = {
    path: 'data'
}

const config = {
    api,
    idGenerator,
    urlGenerator,
    db
};

module.exports = config;