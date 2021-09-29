const express = require('express');

const PORT = 3050;
const app = express();

app.get('/', (req, res, next) => {
    res.sendStatus(404);
});

app.get('/test', (req, res, next) => {
    res.send({ status: 'success' });
});

app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`);
});

module.exports = app;