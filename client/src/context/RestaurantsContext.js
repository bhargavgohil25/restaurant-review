import React, { useState, createContext } from 'react'

export const RestaurantContext = createContext()

export const RestaurantContextProvider = (props) => {
  const [restaurants, setRestaurants] = useState([])
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [userId, setUserId] = useState('')
  const [likes, setLikes] = useState([])
  const [allLikesByUser, setAllLikesByUser] = useState([])
  const [reviewsInfo, setReviewInfo] = useState([])

  const addRestaurants = (restaurant) => {
    setRestaurants([...restaurants, restaurant])
  }

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean)
  }

  const setSearch = (String) => {
    setSearchText(String)
  }

  const setUser = (String) => {
    setUserId(String)
  }

  return (
    <RestaurantContext.Provider
      value={{
        restaurants,
        setRestaurants,
        addRestaurants,
        selectedRestaurant,
        setSelectedRestaurant,
        isAuthenticated,
        setIsAuthenticated,
        setAuth,
        searchText,
        setSearchText,
        setSearch,
        userId,
        setUser,
        likes,
        setLikes,
        allLikesByUser,
        setAllLikesByUser,
        reviewsInfo,
        setReviewInfo,
      }}
    >
      {props.children}
    </RestaurantContext.Provider>
  )
}
