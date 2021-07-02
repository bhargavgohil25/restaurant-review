const express = require('express')
const router = express.Router()
const pool = require('../src/pool')


router.post('/:id/addReview', async (req, res) => {

    try {
        const { id } = req.params
        const { name, review, rating, userid } = req.body

        const newRating = await pool.query(
            "INSERT INTO reviews (restaurant_id, name, review, rating, userid) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
            [id, name, review, rating, userid]
        )
        // console.log(newRating)
        res.status(201).json({
            status: "success",
            data: {
                review: newRating.rows
            }
        })

    } catch (err) {
        res.status(500).json("Server Error")
        console.error(err.message)
    }
})

router.post("/review/likes", async (req, res) => {
    try {
        const { userId, reviewId, restaurantId } = req.body

        const addLike = await pool.query(
            "INSERT INTO likes (user_id, review_id) VALUES ($1, $2) RETURNING *;", [userId, reviewId]
        )

        const response = await pool.query(
            // "SELECT review_id, COUNT(*) FROM ( SELECT restaurant_id, userid FROM reviews JOIN restaurants ON reviews.restaurant_id = restaurants.id) as newreview JOIN likes ON newreview.id = likes.review_id GROUP BY review_id;"
            "select likes.review_id, count(*) as likes from likes inner join reviews on likes.review_id = reviews.id and reviews.restaurant_id = $1 group by likes.review_id;", [restaurantId]
        )
        // console.log(likeCount.rows)
        // if(likeCount.rows){
        //     res.status(200).json({
        //         status: "success",
        //         data: {
        //             count: likeCount.rows
        //         }
        //     })
        // }else{
        //     res.status(404).json("Bad Request")
        // }
        const result = response.rows.map((ele) => {
            if (ele.review_id === null) {
                return 0
            } else {
                return ele.likes
            }
        })

        if (result) {
            res.status(200).json({
                status: "success",
                data: {
                    count: result
                }
            })
        }


    } catch (err) {
        res.status(500).json("Server Error")
        console.log(err.message)
    }
})

router.post("/review/dislikes", async (req, res) => {
    try {
        const { userId, reviewId, restaurantId } = req.body

        const removeLike = await pool.query(
            "DELETE FROM likes WHERE user_id = $1 AND review_id = $2;", [userId, reviewId]
        )

        const response = await pool.query(
            // "SELECT review_id, COUNT(*) FROM ( SELECT restaurant_id, userid FROM reviews JOIN restaurants ON reviews.restaurant_id = restaurants.id) as newreview JOIN likes ON newreview.id = likes.review_id GROUP BY review_id;"
            "select likes.review_id, count(*) as likes from likes inner join reviews on likes.review_id = reviews.id and reviews.restaurant_id = $1 group by likes.review_id;", [restaurantId]
        )
        // console.log(likeCount.rows)
        // if (likeCount.rows) {
        //     res.status(200).json({
        //         status: "success",
        //         data: {
        //             count: likeCount.rows
        //         }
        //     })
        // } else {
        //     res.status(404).json("Bad Request")
        // }

        const result = response.rows.map((ele) => {
            if (ele.review_id === null) {
                return 0
            } else {
                return ele.likes
            }
        })

        if (result) {
            res.status(200).json({
                status: "success",
                data: {
                    count: result
                }
            })
        }

    } catch (error) {
        res.status(500).json("Server Error")
        console.log(err.message)
    }
})

router.get("/review/allLikes/:id", async (req, res) => {
    try {
        const { id } = req.params

        const response = await pool.query(
            "select likes.review_id, count(*) as likes from likes inner join reviews on likes.review_id = reviews.id and reviews.restaurant_id = $1 group by likes.review_id;", [id]
        )

        // console.log(response.rows)
        const result = response.rows.map((ele) => {

            if (ele.review_id === null) {
                return 0
            } else {
                return ele.likes
            }

        })

        // console.log(result)

        if (result) {
            res.status(200).json({
                status: "success",
                data: {
                    count: result
                }
            })
        }

    } catch (err) {
        console.log(err.message)
        res.status(500).json("Server Error")
    }
})

router.get("/review/all-likes-by-user/:userId", async(req, res) => {
    try {
        const { userId } = req.params

        const response = await pool.query(
            "select review_id from likes where user_id = $1;", [userId]
        )

        console.log(response.rows)

        // const result = response.map((ele) => {
        //     return ele.
        // })

        res.status(200).json({
            status : "success",
            data : {
                likes : response.rows
            }
        })
        
    } catch (err) {
        console.log(err.message)
        res.status(500).json("Server Error")
    }
})


module.exports = router;
