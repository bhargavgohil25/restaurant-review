import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import restaurantFinder from '../API/restaurantFinder'
import { RestaurantContext } from '../context/RestaurantsContext'
import StarRating from '../components/StarRating'
import Reviews from '../components/Reviews'
import AddReview from '../components/AddReview'

const RestaurantDetail = () => {
  const { id } = useParams()
  const { selectedRestaurant, setSelectedRestaurant, setReviewInfo } =
    useContext(RestaurantContext)

  const fetchRestaurant = async () => {
    try {
      const response = await restaurantFinder.get(`/${id}`)
      // console.log(response.data.data)
      setSelectedRestaurant(response.data.data)
    } catch (err) {
      console.error(err.message)
    }
  }

  const fetchReviewInfo = async () => {
    try {
      const info = await restaurantFinder.get(`/reviews/info/${id}`)
      // setReviewInfo
      // console.log(info.data.payload);
      const res = info.data.payload
      setReviewInfo(res)
    } catch (err) {
      console.log(err.message)
    }
  }

  // console.log(reviewsInfo);

  useEffect(() => {
    fetchRestaurant()
    fetchReviewInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      {selectedRestaurant && (
        <>
          <h1 className="text-center display-1">
            {selectedRestaurant.restaurant.name}
          </h1>
          <div className="text-center">
            <StarRating rating={selectedRestaurant.restaurant.average_rating} />
            <span className="text-warning">
              {selectedRestaurant.restaurant.count
                ? `(${selectedRestaurant.restaurant.count})`
                : '(0)'}
            </span>
          </div>
          <div className="mt-3">
            {/* <Reviews reviews={selectedRestaurant.reviews} /> */}
            <Reviews />
          </div>
          <h1 className="text-center display-6" style={{ marginTop: '40px' }}>
            Add Your Reviews Here
          </h1>
          <AddReview />
        </>
      )}
    </div>
  )
}

export default RestaurantDetail
