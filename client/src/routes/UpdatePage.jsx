import React from 'react'
import Header from '../components/Header'
import UpdateRestaurant from '../components/UpdateRestaurant'

const UpdatePage = () => {

    const title = "Update Page"
    return (
        <div className="row gy-50">
            <div className="col-12" style={{marginBottom: "30px"}}>
                <Header title={title}/>
            </div>
            <div className="col-12" style={{marginBottom: "30px"}}>
                <UpdateRestaurant />
            </div>
            {/*<div className="col-12" style={{marginBottom: "30px"}}>
                <RestaurantList />
            </div> */}
        </div>
    )
}

export default UpdatePage
