const request = require('supertest');
const app = require('../api')

describe('GET /fetchSupplier', function () {
    it('should responds with json when supplier = undefined', (done) => {
        request(app)
            .get('/fetchSupplier')
            .query({ supplier: undefined, pickup: '51.470020,-0.454295', dropoff: '51.5112079,-0.1215334', min: 3 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    })
    it('should responds with json when min = undefined', (done) => {
        request(app)
            .get('/fetchSupplier')
            .query({ supplier: "dave", pickup: '51.470020,-0.454295', dropoff: '51.5112079,-0.1215334', min: undefined })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    })
})

describe('GET /fetchAllSuppliers', function () {
    it('should responds with json when request is valud', (done) => {
        request(app)
            .get('/fetchAllSuppliers')
            .query({ pickup: '51.470020,-0.454295', dropoff: '51.5112079,-0.1215334', min: 3 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    })
    it('should responds with json when min = undefined', (done) => {
        request(app)
            .get('/fetchAllSuppliers')
            .query({ pickup: '51.470020,-0.454295', dropoff: '51.5112079,-0.1215334', min: undefined })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done);
    })
})

jest.setTimeout(10000);
