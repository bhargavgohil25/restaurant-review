const express = require('express')
const router = express.Router()
const pool = require('../src/pool')


router.post('/:id/addReview', async (req, res) => {

    try {
        const { id } = req.params
        const { name, review, rating } = req.body
        
        const newRating = await pool.query(
            "INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4) RETURNING *;",
            [id, name, review, rating]
        )
        // console.log(newRating)
        res.status(201).json({
            status : "success",
            data : {
                review : newRating.rows
            }
        })

    } catch (err) {
        res.status(500).json("Server Error")
        console.error(err.message)
    }
})



module.exports = router;
