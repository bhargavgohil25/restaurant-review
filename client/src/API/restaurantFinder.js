import axios from 'axios'

// const baseURL = "http://localhost:3005/api/v1/restaurants"

const baseURL = process.env.NODE_ENV === 'production' ? "api/v1/restaurants" : "http://localhost:3005/api/v1/restaurants";

export default axios.create({
    baseURL
})

// NODE_ENV = 'production'
// NODE_ENV = 'development'
