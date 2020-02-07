const tools = require('./app')
const express = require('express')
const app = express()
const port = 3000

app.get('/fetchSupplier', async (req, res) => {
    if (!req.query.supplier) { res.send("You must provide a supplier") }
    const response = await tools.fetchSupplier(req.query.supplier, req.query.pickup, req.query.dropoff, req.query.max)
    console.log(response)
    res.send(JSON.stringify(response));
})

app.get('/fetchAllSuppliers', async (req, res) => {
    if (!req.query.max) { res.send("You must provide a maximum passangers value") }
    const response = await tools.fetchAllSuppliers(req.query.pickup, req.query.dropoff, req.query.max)
    console.log(response)
    res.send(JSON.stringify(response));
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))