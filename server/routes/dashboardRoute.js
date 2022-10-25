const express = require('express')
const authorization = require('../middleware/authorization')
const router = express.Router()
const pool = require('../src/pool')

router.get('/', authorization, async (req, res) => {
  try {
    // as the the authorization is successful the req.user has the payload
    // res.json(req.user)

    const user = await pool.query(
      'SELECT user_name, user_id FROM users WHERE user_id = $1',
      [req.user.id]
    )

    res.json(user.rows[0])
  } catch (err) {
    console.error(err.message)
    res.status(500).json('Server Error')
  }
})

module.exports = router
