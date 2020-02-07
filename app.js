const tools = require('./tools')

const setup = (pickup, dropoff, maxPassangers, supplier) => {
    console.log("* BookingGo Technical Test *")
    console.log("Fetching...")
    console.log("------------------------------------------------------")
    console.log("pickup = \t" + pickup)
    console.log("dropoff = \t" + dropoff)
    console.log("maxPass = \t" + maxPassangers)
    if (supplier) console.log("supplier = \t" + supplier)
    console.log("------------------------------------------------------")
}

const areArgumentsValid = () => {
    if (process.argv.slice(2).length < 3) return false
    return true
}

const printResult = (list) => {
    if (list.length != 0) {
        console.log("\x1b[32m", "Result")
        console.log("\x1b[32m", "________________")
        list.forEach(r => console.log("\x1b[32m", r))
    }
}
const printErros = (errors) => {
    if (errors.length != 0) {
        console.log("\x1b[31m", "Errors")
        console.log("\x1b[31m", "________________")
        errors.forEach(e => console.log("\x1b[31m", e))
    }
}

const run = async () => {
    if (areArgumentsValid()) {
        let pickup = process.argv.slice(2)[0]
        let dropoff = process.argv.slice(2)[1]
        let maxPassangers = process.argv.slice(2)[2]
        let supplier = process.argv.slice(2)[3]
        setup(pickup, dropoff, maxPassangers, supplier)
        let result
        if (supplier == "all" || !supplier) {
            result = await fetchAllSuppliers(pickup, dropoff, maxPassangers)
            const { list, errors } = result
            printResult(list)
            console.log()
            printErros(errors)
        } else {
            result = await fetchSupplier(supplier, pickup, dropoff, maxPassangers)
            console.log(result.value)
        }
    } else {
        console.log("Please provide all required parameters: pickup location, dropoff location and minimum nb of passangers.")
    }

}

run()

module.exports = { fetchSupplier, fetchAllSuppliers }