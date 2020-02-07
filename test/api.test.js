const tools = require('../app')
describe('App Test', () => {
    it('should test that fetchSupplier with invalid input => unsuccessful', async () => {
        const response = await fetchSupplier(null, null, null, null)
        expect(response.status).toBe("unsuccessful")
    })

    // this test could fail due to the uncertainty of the APIs provided
    it('should test that fetchSupplier with valid input => successful', async () => {
        const response = await fetchSupplier("DAVE", "51.470020,-0.454295", "51.5112079,-0.1215334", 4)
        expect(response.status).toBe("successful")
    })
})