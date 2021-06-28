const express = require('express')
const router = express.Router()
const pool = require('../src/pool')
const restoControl = require('../controller/restoControl')
const validRestaurant = require('../middleware/validRestaurant')

router.get('/', async (req, res) => {

    try {
        const results = await restoControl.getResto()
        // console.log(results)
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                restaurants: results.rows
            },
        })
    } catch (err) {
        res.status(500).json("Server Error")
        console.error(err.message)
    }
})

router.get('/searchrestaurants', async (req,res) => {
    try {
        const { search } = req.query
        // console.log(search)

        const results = await restoControl.getSearch(search)
        console.log(results)

        res.status(200).json({
            status: "success",
            results : results.rows.length,
            data : {
                restaurants : results.rows
            }
        })
    } catch (err) {
        console.error(err.message)
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const [restaurant, reviews] = await restoControl.getByIdResto(id)
        // const reviews = await restoControl.getByIdResto(id)
        // console.log(reviews)
        res.status(200).json({
            status: "success",
            data: {
                restaurant: restaurant.rows[0],
                reviews: reviews.rows,
            },
        })

    } catch (err) {
        res.status(500).json("Server Error")
        console.error(err.message)
    }
})

router.post('/', async (req, res) => {

    try {
        const { name, location, price_range } = req.body

        if (!name || !location || !price_range) {
            res.status(200).json("Invalid Information")
        }else{
            const result = await restoControl.postResto(name, location, price_range)
    
            res.status(200).json({
                status: "success",
                data: {
                    restaurant: result.rows[0]
                }
            })
        }


    } catch (err) {
        res.status(500).json("Server Error")
        console.error(err.message)
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { name, location, price_range } = req.body

        const result = await restoControl.updateResto(name, location, price_range, id)

        res.status(200).json({
            status : "success",
            data : {
                restaurant : result.rows[0]
            }
        })

    } catch (err) {
        res.status(500).json("Server Error")
        console.error(err.message)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const results = await pool.query(
            "DELETE FROM restaurants WHERE id = $1;",
            [id]
        )
        res.status(204).json({
            status: "success"
        })
    } catch (err) {
        res.status(500).json("Server Error")
        console.error(err.message)
    }
})


module.exports = router;
