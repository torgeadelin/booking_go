const fetch = require("node-fetch")

const ENDPOINT = "https://techtest.rideways.com/"
module.exports = SUPPLIERS = {
    dave: "dave",
    eric: "eric",
    jeff: "jeff"
}

const LIMITS = new Map()
LIMITS.set("STANDARD", 4)
LIMITS.set("EXECUTIVE", 4)
LIMITS.set("LUXURY", 4)
LIMITS.set("PEOPLE_CARRIER", 6)
LIMITS.set("LUXURY_PEOPLE_CARRIER", 6)
LIMITS.set("MINIBUS", 16)

timeout = (ms, promise) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error("Timeout"))
        }, ms)
        promise.then(resolve, reject)
    })
}

module.exports = formatData = (data, supplier, minPassangers) => {
    const sorted = data.options.sort((a, b) => a.price > b.price)
    const filtered = sorted.filter(s => LIMITS.get(s.car_type) > minPassangers)
    const formatted = filtered.map(a => `${a.car_type} - ${supplier} - ${a.price}`)
    return formatted
}

module.exports = fetchSupplier = async (supplier, pickup, dropoff, minPassangers) => {
    if (!SUPPLIERS.hasOwnProperty(supplier)) return { status: "unsuccessful", code: 400, value: "Invalid supplier" }
    let url = ENDPOINT + supplier + "?pickup=" + pickup + "&dropoff=" + dropoff;
    const result = await timeout(2000, fetch(url))
        .then(response => response.json())
        .then(response => {
            return response
        }).catch(error => {
            return error
        })
    if (result instanceof Error) {
        return { status: "unsuccessful", code: 400, value: `${supplier} - Timeout` }
    }
    if (result.status == 400 || result.status == 500) {
        let errorMessage = `${result.timestamp} - ${supplier} - ${result.error} - ${result.message}`
        return { status: "unsuccessful", code: result.status, value: errorMessage }
    } else {
        const formatted = formatData(result, supplier, minPassangers)
        if (formatted.length != 0)
            return { status: "successful", code: 200, value: formatted[0] }
        else
            return { status: "unsuccessful", code: 200, value: `No results found for ${supplier}.` }
    }
}

module.exports = fetchAllSuppliers = async (pickup, dropoff, minPassangers) => {
    let list = []
    let errors = []
    for (SUPPLIER in SUPPLIERS) {
        const res = await fetchSupplier(SUPPLIER, pickup, dropoff, minPassangers)
        if (res.status == "successful") {
            list.push(res.value)
        } else {
            errors.push(res.value)
        }
    }
    return { list, errors }
}

