import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import restaurantFinder from '../API/restaurantFinder'
import { RestaurantContext } from '../context/RestaurantsContext'
import StarRating from './StarRating'


const RestaurantList = () => {
    let history = useHistory()

    const { restaurants, setRestaurants } = useContext(RestaurantContext)

    const fetchAllRestaurants = async () => {
        try {
            const response = await restaurantFinder.get('/')
            // console.log(response)
            setRestaurants(response.data.data.restaurants);
        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        fetchAllRestaurants()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleUpdate = async (e, id) => {
        e.stopPropagation()
        history.push(`/restaurants/${id}/update`)
    }

    const handleDelete = async (e, id) => {
        e.stopPropagation()
        try {
            await restaurantFinder.delete(`/${id}`)
            setRestaurants(restaurants.filter((restaurant) => {
                return restaurant.id !== id
            }))
            // Todo: toastify
        } catch (err) {
            console.error(err.message)
        }
    }

    const handleRestaurantSelect = (id) => {
        history.push(`/restaurants/${id}`)
    }

    const renderRating = (restaurant) => {
        return (
            <>
                {restaurant.average_rating ? <StarRating rating={restaurant.average_rating} /> : <span className="text-warning ml-1">0 Reviews</span>}
                {restaurant.average_rating ? <span className="text-warning ml-1">({restaurant.count})</span> : <span></span>}
            </>
        )
    }


    return (
        <div className="list-group table-responsive">
            <table className="table table-hover table-dark" style={{ borderRadius: '50px' }}>
                <thead>
                    <tr className="table-primary    ">
                        <th scope="col">Restaurant</th>
                        <th scope="col">Location</th>
                        <th scope="col">Price Range</th>
                        <th scope="col">Ratings</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants && restaurants.map((restaurant) => {
                        return (
                            <tr
                                key={restaurant.id}
                                onClick={() => handleRestaurantSelect(restaurant.id)}
                            >
                                <td>{restaurant.name}</td>
                                <td>{restaurant.location}</td>
                                <td>{"$".repeat(restaurant.price_range)}</td>
                                <td>{renderRating(restaurant)}</td>
                                <td>
                                    <button
                                        className="btn btn-warning"
                                        onClick={(e) => handleUpdate(e, restaurant.id)}
                                    >Update
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={(e) => handleDelete(e, restaurant.id)}
                                    >Delete
                                    </button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default RestaurantList
