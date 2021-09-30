const { generateAnalyticsGlobalReport } = require('../business/analytics');

async function getAnalyticsGloablReport(_, res) {
    try {
        const analyticsGlobalReport = await generateAnalyticsGlobalReport();

        res.send(analyticsGlobalReport);
    } catch (error) {
        res.sendStatus(400);
    }
}

module.exports = {
    getAnalyticsGloablReport
};