const pool = require('../src/pool');


class restoControl {
    static async getResto() {
        // const result = await pool.query('SELECT * FROM restaurants;')
        const restaurantRatingData = await pool.query('SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), trunc(AVG(rating),1) as average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id;')
        // console.log("result", result.rows)
        // console.log("restaurantRatingData", restaurantRatingData.rows)
        return restaurantRatingData
    }

    static async getByIdResto(id) {
        const restaurant = await pool.query(
            "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), trunc(AVG(rating),1) as average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id WHERE id = $1;"
            ,[id]
        )

        const reviews = await pool.query(
            "SELECT * FROM reviews WHERE restaurant_id = $1",
            [id]
        )

        return [restaurant, reviews]
    }

    static async postResto(name, location, price_range){
        const result = await pool.query(
            "INSERT INTO restaurants (name, location, price_range) VALUES($1 , $2, $3) RETURNING *;", 
            [name, location, price_range]
        )

        return result
    }

    static async updateResto(name, location, price_range, id){
        const result = await pool.query(
            "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *;",
            [name, location, price_range, id]
        )

        return result
    }
}


module.exports = restoControl