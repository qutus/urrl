const Datastore = require('nedb');

const { db: dbConfig } = require('../config');

const db = new Datastore({ filename: `${dbConfig.path}/shortUrlGeneration`, autoload: true });

async function insertUrlGeneration(originalUrl, shortUrl, shortUrlId) {
    return new Promise((resolve, reject) => {
        db.insert({
            originalUrl,
            shortUrl,
            shortUrlId,
            analytics: {
                redirectionCount: 0
            }
        }, (err, newDoc) => {
            if(err) {
                reject(err);
            } else {
                resolve(newDoc);
            }
        });
    });
}

async function findUrlGenerationByShortUrlId(shortUrlId) {
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

async function increaseUrlGenerationAnalyticRedirectionCountByShortUrlId(shortUrlId) {
    return new Promise((resolve, reject) => {
        db.update({ shortUrlId }, { $inc: { 'analytics.redirectionCount': 1 }  }, (err, _, docs) => {
            if(err) {
                reject(err);
            } else {
                resolve(docs);
            }
        });
    });
}

async function findAllUrlGenerationForGlobalAnalyticReport() {
    return new Promise((resolve, reject) => {
        db.find({}, { _id: 0, originalUrl: 1, shortUrl: 1, analytics: 1 }, (err, docs) => {
            if(err) {
                reject(err);
            } else {
                resolve(docs);
            }
        });
    });
}

module.exports = {
    insertUrlGeneration,
    findUrlGenerationByShortUrlId,
    increaseUrlGenerationAnalyticRedirectionCountByShortUrlId,
    findAllUrlGenerationForGlobalAnalyticReport
}