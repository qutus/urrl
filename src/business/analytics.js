const { findAllUrlGenerationForGlobalAnalyticReport } = require('../db/generatedUrl');

async function generateAnalyticsGlobalReport() {
    const analyticsGlobalReport = await findAllUrlGenerationForGlobalAnalyticReport();
    return analyticsGlobalReport;
}

module.exports = {
    generateAnalyticsGlobalReport
};