const express = require('express');
const morgan = require('morgan');

const { api: apiConfig } = require('./config');

const mountRoutes = require('./routes');

const app = express();

app.use(express.json());
if(process.env.NODE_ENV !== 'test') {
    app.use(morgan('tiny'));
}

mountRoutes(app);

if(process.env.NODE_ENV !== 'test') {
    app.listen(apiConfig.port, () => {
        console.log(`Server up and running on port ${apiConfig.port}`);
    });
}

module.exports = app;