const Datastore = require('nedb');

const { db: dbConfig } = require('../config');

const db = new Datastore({ filename: `${dbConfig.path}/shortUrlGeneration`, autoload: true });

async function insertUrlGeneration(originalUrl, shortUrl, shortUrlId) {
    return new Promise((resolve, reject) => {
        db.insert({
            originalUrl,
            shortUrl,
            shortUrlId
        }, (err, newDoc) => {
            if(err) {
                reject(err);
            } else {
                resolve(newDoc);
            }
        });
    });
}

async function findUrlGenerationByShortUriId(shortUrlId) {
    return new Promise((resolve, reject) => {
        db.findOne({ shortUrlId }, (err, doc) => {
            if(err) {
                reject(err);
            } else {
                resolve(doc);
            }
        });
    });
}



module.exports = {
    insertUrlGeneration,
    findUrlGenerationByShortUriId
}