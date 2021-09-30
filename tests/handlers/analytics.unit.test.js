describe('analytics', () => {
    describe('getAnalyticsGloablReport', () => {
        it('Should send a report([\'ze\', \'report\']) without error', async () => {
            jest.resetModules();
            jest.mock('../../src/business/analytics', () => ({
                generateAnalyticsGlobalReport: () => ['ze', 'report']
            }));
            const { getAnalyticsGloablReport } = require('../../src/handlers/analytics');
            
            const mockSendFunction = jest.fn();
            const mockRes = {
                send: mockSendFunction
            };
    
            await getAnalyticsGloablReport(null, mockRes);
    
            expect(mockSendFunction).toHaveBeenCalledWith(['ze', 'report']);
        });

        it('Should send a report(42) without error', async () => {
            jest.resetModules();
            jest.mock('../../src/business/analytics', () => ({
                generateAnalyticsGlobalReport: () => 42
            }));
            const { getAnalyticsGloablReport } = require('../../src/handlers/analytics');
            
            const mockSendFunction = jest.fn();
            const mockRes = {
                send: mockSendFunction
            };
    
            await getAnalyticsGloablReport(null, mockRes);
    
            expect(mockSendFunction).toHaveBeenCalledWith(42);
        });

        it('Should send a 400 status on catched thrown error', async () => {
            jest.resetModules();
            jest.mock('../../src/business/analytics', () => ({
                generateAnalyticsGlobalReport: () => { throw new Error(); }
            }));
            const { getAnalyticsGloablReport } = require('../../src/handlers/analytics');
            
            const mockSendStatusFunction = jest.fn();
            const mockRes = {
                sendStatus: mockSendStatusFunction
            };
    
            await getAnalyticsGloablReport(null, mockRes);
    
            expect(mockSendStatusFunction).toHaveBeenCalledWith(400);
        });

    });
});