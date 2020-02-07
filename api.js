const tools = require('./tools')
const express = require('express')
const app = express()
const port = 3000

app.get('/fetchSupplier', (req, res) => {
    if (!req.query.supplier) {
        res.type('json').status(400).send({ message: "You must provide a supplier" })
    } else if (!req.query.min) {
        res.type('json').status(400).send({ message: "You must provide a min nb of passangers" })
    } else {
        fetchSupplier(req.query.supplier, req.query.pickup, req.query.dropoff, req.query.min).then(response => {
            res.type('json').status(response.code).send(response);
        }).catch(err => {
            res.type('json').status(500).send({ error: err });
        })
    }
})

app.get('/fetchAllSuppliers', (req, res) => {
    if (!req.query.min) {
        res.type('json').status(400).send({ message: "You must provide a maximum passangers value" })
    } else {
        fetchAllSuppliers(req.query.pickup, req.query.dropoff, req.query.min).then(response => {
            res.type('json').status(200).send(response);
        }).catch(err => {
            res.type('json').status(500).send({ error: err });
        })
    }
})

module.exports = server = app.listen(port, () => console.log(`Example app listening on port ${port}!`))