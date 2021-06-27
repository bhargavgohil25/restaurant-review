import React, { useContext, useEffect, useState } from 'react'
import AddRestaurant from '../components/AddRestaurant'
import Header from '../components/Header'
import RestaurantList from '../components/RestaurantList'
import { RestaurantContext } from '../context/RestaurantsContext'
import { toast } from 'react-toastify'

const Home = () => {
    const title = "Restaurant Finder";

    const { setAuth } = useContext(RestaurantContext)

    const [name, setName] = useState("")

    const getInfo = async () => {
        try {
            const response = await fetch("http://localhost:3005/dashboard/", {
                method: "GET",
                headers: { token: localStorage.token }
            })

            const parseResponse = await response.json()

            setName(parseResponse.user_name)

        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getInfo()
    }, [])

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token")
        setAuth(false)
        toast.success("Logged Out Successfully")
    }

    return (
        <div className="row gy-50">
            <div class="row justify-content-center">
                <div class="col-md-11 col-sm-12">
                    <Header title={title} />
                </div>
                <div class="col-md-1 col-sm-6">
                    <button 
                        style={{marginTop : "35px", marginLeft : "50px"}}
                        className="btn btn-danger"
                        onClick = {(e) => handleLogout(e)}
                    >
                        Logout
                    </button>
                </div>
            </div>
            <h1 className="font-weight-light display-7 text-center" style={{ marginBottom: "50px" }}>
                Welcome, {name}
            </h1>
            <div className="col-12" style={{ marginBottom: "30px" }}>
                <AddRestaurant />
            </div>
            <div className="col-12" style={{ marginBottom: "30px" }}>
                <RestaurantList />
            </div>
        </div>
    )
}

export default Home

