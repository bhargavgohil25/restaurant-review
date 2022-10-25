import React, { useContext, useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import RangeSlider from 'react-bootstrap-range-slider'
import { Col } from 'react-bootstrap'
import restaurantFinder from '../API/restaurantFinder'
import { RestaurantContext } from '../context/RestaurantsContext'

const UpdateRestaurant = () => {
  let history = useHistory()
  const { addRestaurants } = useContext(RestaurantContext)

  const { id } = useParams()

  const [range, setRange] = useState(1)
  const [inputs, setInputs] = useState({
    name: '',
    location: '',
  })
  const { name, location } = inputs

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await restaurantFinder.put(`/${id}`, {
        name,
        location,
        price_range: range.toString(),
      })

      addRestaurants(response.data.data.restaurant)

      history.push('/')
      // Todo: Toastify
    } catch (err) {
      console.error(err.message)
    }
  }

  const fetchAllRestaurants = async () => {
    try {
      const response = await restaurantFinder.get(`/${id}`)
      // console.log(response.data.data)
      setRange(response.data.data.restaurant.price_range)
      setInputs({
        ...inputs,
        name: response.data.data.restaurant.name,
        location: response.data.data.restaurant.location,
      })
      // setRestaurants(response.data.data.restaurants);
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    fetchAllRestaurants()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="gy-20">
      <form action="" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            name="name"
            id="name"
            className="form-control"
            type="text"
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            name="location"
            id="location"
            className="form-control"
            type="text"
            value={location}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price_range">Price Range</label>
          <Col xs="4">
            <RangeSlider
              // tooltip='on'
              min={1}
              max={5}
              value={range}
              onChange={(changeEvent) => setRange(changeEvent.target.value)}
            />
          </Col>
        </div>
        <div style={{ marginTop: '40px' }}>
          <button type="submit" className="btn btn-primary mt-10">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default UpdateRestaurant
