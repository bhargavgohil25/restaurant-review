import axios from 'axios'

// const baseURL = "http://localhost:3005/authenticate"

const baseURL =
  process.env.NODE_ENV === 'production'
    ? '/authenticate'
    : 'http://localhost:3005/authenticate'

export default axios.create({
  baseURL,
})
