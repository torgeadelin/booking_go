const fetch = require("node-fetch")

const ENDPOINT = "https://techtest.rideways.com/"
const SUPPLIERS = {
    DAVE: "dave",
    ERIC: "eric",
    JEFF: "jeff"
}

const LIMITS = new Map()
LIMITS.set("STANDARD", 4)
LIMITS.set("EXECUTIVE", 4)
LIMITS.set("LUXURY", 4)
LIMITS.set("PEOPLE_CARRIER", 6)
LIMITS.set("LUXURY_PEOPLE_CARRIER", 6)
LIMITS.set("MINIBUS", 16)

const setup = (pickup, dropoff, maxPassangers) => {
    console.log("* BookingGo Technical Test *")
    console.log("Fetching...")
    console.log("------------------------------------------------------")
    console.log("pickup = \t" + pickup)
    console.log("dropoff = \t" + dropoff)
    console.log("maxPass = \t" + maxPassangers)
    console.log("------------------------------------------------------")
}

timeout = (ms, promise) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error("Timeout"))
        }, ms)
        promise.then(resolve, reject)
    })
}

module.exports = fetchSupplier = async (supplier, pickup, dropoff, maxPassangers) => {
    let url = ENDPOINT + supplier + "?pickup=" + pickup + "&dropoff=" + dropoff;
    const result = await timeout(2000, fetch(url))
        .then(response => response.json())
        .then(response => {
            return response
        }).catch(error => {
            return error
        })

    if (result instanceof Error) {
        return { status: "unsuccessful", value: `${supplier} - Timeout` }
    }
    if (result.status == 400 || result.status == 500) {
        let errorMessage = `${result.timestamp} - ${supplier} - ${result.error} - ${result.message}`
        return { status: "unsuccessful", value: errorMessage }
    } else {
        const sorted = result.options.sort((a, b) => a.price > b.price)
        const filtered = sorted.filter(s => LIMITS.get(s.car_type) > maxPassangers)
        const formatted = filtered.map(a => `${a.car_type} - ${supplier} - ${a.price}`)
        if (formatted.length != 0)
            return { status: "successful", value: formatted[0] }
        else
            return { status: "unsuccessful", value: `No results found for ${supplier}.` }
    }
}

module.exports = fetchAllSuppliers = async (pickup, dropoff, maxPassangers) => {
    let list = []
    let errors = []
    for (SUPPLIER in SUPPLIERS) {
        const res = await fetchSupplier(SUPPLIER, pickup, dropoff, maxPassangers)
        if (res.status == "successful") {
            list.push(res.value)
        } else {
            errors.push(res.value)
        }
    }
    return { list, errors }
}

console.log(fetchSupplier(null, null, null, null))

const run = async () => {
    let pickup = process.argv.slice(2)[0]
    let dropoff = process.argv.slice(2)[1]
    let maxPassangers = process.argv.slice(2)[2]
    setup(pickup, dropoff, maxPassangers)
    let result = await fetchAllSuppliers(pickup, dropoff, maxPassangers)
    const { list, errors } = result

    if (list.length != 0) {
        console.log("\x1b[32m", "Result")
        console.log("\x1b[32m", "________________")
        list.forEach(r => console.log("\x1b[32m", r))
    }
    console.log()
    if (errors.length != 0) {
        console.log("\x1b[31m", "Errors")
        console.log("\x1b[31m", "________________")
        errors.forEach(e => console.log("\x1b[31m", e))
    }
}



module.exports = { fetchSupplier, fetchAllSuppliers }