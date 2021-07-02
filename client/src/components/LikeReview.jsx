import React, { useContext, useState } from 'react'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import restaurantFinder from '../API/restaurantFinder';
import { RestaurantContext } from '../context/RestaurantsContext';

const LikeReview = ({ reviewId, id, bool }) => {

    const { userId, likes, setLikes, setAllLikesByUser } = useContext(RestaurantContext)

    const [likedCurr, setLikedCurr] = useState(false)


    const handleLikeClick = async (e, reviewId) => {
        if (!likedCurr) {
            try {
                const likesRes = await restaurantFinder.post('/review/likes', {
                    userId,
                    reviewId,
                    restaurantId: id
                })

                // console.log(response)
                const response = likesRes.data.data.count
                setLikes(response)

            } catch (err) {
                console.error(err.message)
            }
            setLikedCurr(!likedCurr)
        }
        else {

            try {
                const likesRes = await restaurantFinder.post('/review/dislikes', {
                    userId,
                    reviewId,
                    restaurantId: id
                })
                // console.log(response)
                const response = likesRes.data.data.count
                setLikes(response)


                const likesByUserId = await restaurantFinder.get(`/review/all-likes-by-user/${userId}`)

                const likesByReview = likesByUserId.data.data.likes.map((ele) => {
                    return ele.review_id
                })
                setAllLikesByUser(likesByReview)
                bool = false
            } catch (err) {
                console.error(err.message)
            }
            setLikedCurr(!likedCurr)
        }
    }

    return (
        <>
            <span className="col">
                <IconButton aria-label="delete"
                    onClick={(e) => handleLikeClick(e, reviewId)}
                >
                    {
                        likedCurr || bool ?
                            <FavoriteIcon
                                color="secondary"
                            />
                            :
                            <FavoriteBorderIcon
                            />
                    }
                </IconButton>
            </span>
        </>
    )
}

export default LikeReview
