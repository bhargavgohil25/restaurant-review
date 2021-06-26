import React, { useContext, useState } from 'react'
import restaurantFinder from '../API/restaurantFinder'
import { RestaurantContext } from '../context/RestaurantsContext'
import RangeSlider from 'react-bootstrap-range-slider';
// import { Col } from 'react-bootstrap';

const AddRestaurant = () => {

    const { addRestaurants } = useContext(RestaurantContext)
    const [range, setRange] = useState(1)

    const [inputs, setInputs] = useState({
        name: "",
        location: ""
    })

    const { name, location } = inputs

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await restaurantFinder.post("/", {
                name,
                location,
                price_range : range.toString()
            })
            // console.log(response)

            addRestaurants(response.data.data.restaurant)
            // Todo: Toastify 
        } catch (err) {
            console.log(err.message)

        }
    }

    return (
        <div className="responsive gap-sm-10">
            <form
                action=""
                className="row"
                onSubmit={onSubmit}
            >
                <div className="col-md">
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="name"
                        value={name}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="col-md">
                    <input
                        className="form-control"
                        name="location"
                        type="text"
                        placeholder="location"
                        value={location}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="col-md">
                <label htmlFor="price_range">Price Range</label>
                    <RangeSlider
                        // tooltip='on'
                        min={1}
                        max={5}
                        value={range}
                        onChange={e => setRange(e.target.value)}
                    />
                </div>



                {/* <div className="col-md">
                    <select
                        value={priceRange}
                        name="priceRange"
                        onChange={e => onChange(e)}
                        className="form-select my-1 mr-sm-2"
                    >
                        <option disabled>Price Range</option>
                        <option value="1">$</option>
                        <option value="2">$$</option>
                        <option value="3">$$$</option>
                        <option value="4">$$$$</option>
                        <option value="5">$$$$$</option>
                    </select>
                </div> */}
                <div className="col-md">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '150px' }}
                    >
                        Add
                    </button>
                </div>

            </form>
        </div>
    )
}

export default AddRestaurant
