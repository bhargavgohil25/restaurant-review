import React, { useContext, useEffect, useState } from 'react'
import StarRating from './StarRating'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
import IconButton from '@material-ui/core/IconButton'
import { RestaurantContext } from '../context/RestaurantsContext'
import { useParams } from 'react-router'
import LikeReview from '../components/LikeReview.jsx'
import restaurantFinder from '../API/restaurantFinder'

const Reviews = () => {
  const { id } = useParams()

  const {
    likes,
    setLikes,
    userId,
    allLikesByUser,
    setAllLikesByUser,
    reviewsInfo,
    setReviewInfo,
  } = useContext(RestaurantContext)
  const [like, setLike] = useState()

  // const fetchAllLikes = async () => {
  //     try {
  //         const allReviewLikes = await restaurantFinder.get(`/review/allLikes/${id}`)
  //         const likesByUserId = await restaurantFinder.get(`/review/all-likes-by-user/${userId}`)

  //         const likesByReview = likesByUserId.data.data.likes.map((ele) => {
  //             return ele.review_id
  //         })
  //         setAllLikesByUser(likesByReview)
  //         // console.log(likesByReview)
  //         const response = allReviewLikes.data.data.count
  //         setLikes(response)

  //     } catch (err) {
  //         console.log(err.message)
  //     }
  // }

  // useEffect(() => {
  //     fetchAllLikes()
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[])

  // useEffect(() => {
  //     fetchInfo()
  // },[])

  const handleLike = async (reviewId) => {
    try {
      const response = await restaurantFinder.post('/reviews/likes', {
        userId,
        reviewId,
      })
      setReviewInfo(
        reviewsInfo.map((review) => {
          if (review.id === reviewId) {
            if (response.data.liked) {
              return { ...review, users_like: [...review.users_like, 0] }
            } else {
              const likesArray = review.users_like
              likesArray.pop()
              return { ...review, users_like: likesArray }
            }
          } else {
            return review
          }
        })
      )
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <div className="row row-cols-3 mb-2">
      {reviewsInfo.map((review, idx) => {
        return (
          <div
            key={review.id}
            className="card border-info mb-3 mr-4"
            style={{ maxWidth: '30%' }}
          >
            <div
              className="card-header d-flex justify-content-between"
              style={{ backgroundColor: 'white' }}
            >
              <span className="col-sm-6">
                {review.name} - {review.id}{' '}
              </span>
              <span className="col-sm-6">
                {' '}
                <StarRating rating={review.rating} />{' '}
              </span>
            </div>
            <div className="card-body">
              <p className="card-text">{review.review}</p>
            </div>
            <div className="car-footer">
              {/* { allLikesByUser.includes(review.id) ? <LikeReview reviewId={review.id} id={id} bool={true} /> : <LikeReview reviewId={review.id} id={id} bool={false} />  }
                            { likes[idx] ? likes[idx] : 0 } */}
              <span className="col">
                <IconButton aria-label="delete">
                  <FavoriteBorderIcon onClick={() => handleLike(review.id)} />
                </IconButton>
              </span>
              <span>{review.users_like.length}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Reviews
