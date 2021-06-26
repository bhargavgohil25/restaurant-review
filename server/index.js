const app = require('./src/app')
require('dotenv').config()
const pool = require('./src/pool')

pool.connect({
    host: "localhost",
    port: 5432,
    database: process.env.DATABASE,
    user: "postgres",
    password: process.env.PASSWORD
}).then(() => {
    app().listen(process.env.PORT, () => {
        console.log(`Listening on port ${process.env.PORT}`)
    })
}).catch((err) => {
    console.error(err)
});

