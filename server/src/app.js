const express = require('express')
const cors = require("cors")
const morgan = require('morgan')
const restoRoute = require('../routes/restoRoute')
const reviewRoute = require('../routes/reviewRoute')
// const dashboardRoute = require('../routes/dashboard')

module.exports = () => {
    const app = express()
    app.use(cors())
    app.use(morgan('dev'))
    app.use(express.json())
    app.use("/api/v1/restaurants", restoRoute)
    app.use("/api/v1/restaurants", reviewRoute)
    // app.use("/dashboard", dashboardRoute)

    return app;
};
