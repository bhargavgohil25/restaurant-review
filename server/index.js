const app = require('./src/app')
require('dotenv').config()
const pool = require('./src/pool')

pool
  .connect({
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
  })
  .then(() => {
    app().listen(process.env.PORT || 3005, () => {
      console.log(`Listening on port ${process.env.PORT}`)
    })
  })
  .catch((err) => {
    console.error(err)
  })
