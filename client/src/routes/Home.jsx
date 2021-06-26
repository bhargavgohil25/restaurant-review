import React from 'react'
import AddRestaurant from '../components/AddRestaurant'
import Header from '../components/Header'
import RestaurantList from '../components/RestaurantList'


const Home = () => {
    const title = "Restaurant Finder";
    return (
        <div className="row gy-50">
            <div className="col-12" style={{marginBottom: "30px"}}>
                <Header title={title}/>
            </div>
            <div className="col-12" style={{marginBottom: "30px"}}>
                <AddRestaurant />
            </div>
            <div className="col-12" style={{marginBottom: "30px"}}>
                <RestaurantList />
            </div>
        </div>
    )
}

export default Home

