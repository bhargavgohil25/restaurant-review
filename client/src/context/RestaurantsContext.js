import React, {useState, createContext} from 'react'

export const RestaurantContext = createContext()

export const RestaurantContextProvider = props => {

    const [restaurants, setRestaurants] = useState([])
    const [selectedRestaurant, setSelectedRestaurant] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const addRestaurants = (restaurant) => {
        setRestaurants([...restaurants, restaurant])
    }
    
    const setAuth = (boolean) => {
        setIsAuthenticated(boolean)
    }

    return(
        <RestaurantContext.Provider 
            value={{
                restaurants, 
                setRestaurants, 
                addRestaurants, 
                selectedRestaurant, 
                setSelectedRestaurant, 
                isAuthenticated,
                setIsAuthenticated,
                setAuth
            }} >
            {props.children}
        </RestaurantContext.Provider>
    )
}



