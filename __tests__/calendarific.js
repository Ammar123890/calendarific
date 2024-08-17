const supertest = require('supertest'); // Supertest to handle HTTP assertions
const { app } = require('../index'); 
const { setDataInCache, getDataFromCache } = require('../Utils/cache');

// Mock the cache methods to prevent actual cache interaction during tests
jest.mock('../Utils/cache');

// Describe a test suite for the Holiday API
describe('Holiday API Tests', () => {
    // Before each test, clear any mocks to ensure a clean state
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Test case to check handling of invalid country input
    it('should return 400 for invalid country inputs', async () => {
        const response = await supertest(app)
            .get('/holidays') 
            .query({ country: 'XYZ', year: '2025' });
        expect(response.status).toBe(400);
        expect(response.body.message).toContain('\"country\" must be a 2-letter uppercase ISO-3166 country code');
    });

    // Test case to check the retrieval of holiday data for valid parameters
    it('should return holidays data for valid parameters', async () => {

        setDataInCache.mockResolvedValueOnce(null);
        getDataFromCache.mockResolvedValueOnce({
            success: true,
            message: 'Holidays retrieved successfully',
            data: { holidays: [] } 
        });
        const response = await supertest(app)
            .get('/holidays')
            .query({ country: 'US', year: '2024' });
        expect(response.status).toBe(200);
        expect(response.body.data).toBeDefined();
    });

    // Test case to check the correct use of cached data if available
    it('should correctly use cached data if available', async () => {
        // Prepare mocked data as it would be retrieved from the cache
        const cachedData = {
            success: true,
            message: 'Holidays retrieved successfully',
            data: null, 
            code: 200  
        };
        // Mock the cache retrieval to return the prepared cached data
        getDataFromCache.mockResolvedValueOnce(cachedData);

        const response = await supertest(app)
            .get('/holidays')
            .query({ country: 'US', year: '2024' });

        expect(response.status).toBe(200);
        expect(response.body).toEqual(cachedData);
    });
});
