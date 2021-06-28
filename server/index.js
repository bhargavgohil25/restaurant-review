const app = require('./src/app')
require('dotenv').config()
const pool = require('./src/pool')

pool.connect({
    host: "localhost",
    port: 5432,
    database: yelp,
    user: "postgres",
    password: "Bapasitar@25"
}).then(() => {
    app().listen(process.env.PORT || 3005, () => {
        console.log(`Listening on port ${process.env.PORT}`)
    })
}).catch((err) => {
    console.error(err)
});

