# 🚕 BookingGo Techincal Test Submission

Command line application / script && simple REST API.

## 🛠 Build And Compile

- Install node if you don't have it already
- Clone the project using `git clone`
- Go to the project directory `cd booking_go`
- Run `npm install` in your terminal to install all dependencies
- Run `npm test` to run unit tests. Run `npm test -- --coverage` to check the coverage. You then can also open the test results by running `open coverage/lcov-report/index.html`

##### 🔖 Note for `npm test`

The API seems to have a random behaviour and while testing the fetch functions one of the test might fail.

## 🏃 Run

### Part 1

1. To run the command line application use `node app.js {pickupLocation} {dropoffLocation} {minPassangers} {(optional)supplier}`

   - `pickup` and `dropoff` have to be of the following format `latitude,longitude`. If you'd like to fetch data from a specific supplier add the {supplier} parameter as well.
   - Available suppliers "**dave**", "**jeff**" or "**eric**". If no parameter is provided "**all**" will be used by default.

2. The applcation will return the result and erros if there are any.

Example: `node app.js 51.470020,-0.454295 51.5112079,-0.1215334 3`

### Part 2

- To start a local server for the REST api run `node api.js`
- Open postman or your browser and make a GET request to `localhost:3000/endpoint` to test the API. The following endpoints are available

  | Endpoint             | Query Parameters                                                        | Example Response                                                                            |
  | -------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
  | `/fetchSupplier`     | `{supplier: "string", pickup: "lat,lon", dropoff: "lat,lon", min: int}` | `{ "status": "unsuccessful/unsuccesfull" "code": 400, "value": "MINIBUS - dave - 145311" }` |
  | `/fetchAllSuppliers` | `{pickup: "lat,lon", dropoff: "lat,lon", min: int}`                     | `{ "list": [...], "errors": [...]}`                                                         |

  Examples:

  - `http://localhost:3000/fetchSupplier?supplier=dave&pickup=51.470020,-0.454295&dropoff=51.5112079,-0.1215334&min=3`
  - `http://localhost:3000/fetchAllSuppliers?supplier=dave&pickup=51.470020,-0.454295&dropoff=51.5112079,-0.1215334&min=3`

#### Implementation considerations

Part 1 has multiple tasks that build on top of each other, and therefore I created a single function that will allow to fetch all suppliers or just a specific one(including dave's).
