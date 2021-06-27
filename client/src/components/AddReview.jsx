import React, { useState } from 'react'
import RangeSlider from 'react-bootstrap-range-slider';
import { Col } from 'react-bootstrap';
import restaurantFinder from '../API/restaurantFinder';
import { useParams } from 'react-router-dom';

const AddReview = () => {
    const { id } = useParams()

    const [rating, setRating] = useState(0)

    const [inputs, setInputs] = useState({
        name: "",
        review : ""
    })

    const { name, review } = inputs

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    const reloadPage = () => {
        window.location.reload()
    }

    const onReviewSubmit = async (e) => {
        e.preventDefault()
        try {
            e.preventDefault();
            await restaurantFinder.post(`/${id}/addReview`,{
                name,
                review,
                rating
            })

            reloadPage()

        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <div className="mb-2">
            <form 
                onSubmit={(e) => onReviewSubmit(e)}
                action=""
            >
                <div className="form-row mr-50">
                    <div className="form-group col-md-8">
                        <label htmlFor="name">Name</label>
                        <input 
                            id="name" 
                            type="text" 
                            name="name"
                            value={name}
                            placeholder="name" 
                            className="form-control" 
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="rating">Rating</label>
                        <Col className="xs-4">
                            <RangeSlider
                                // tooltip='on'
                                min={0}
                                max={5}
                                value={rating}
                                onChange={changeEvent => setRating(changeEvent.target.value)}
                            />
                        </Col>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="Review">Review</label>
                    <textarea 
                        id="review" 
                        className="form-control" 
                        name="review"
                        value={review}
                        onChange={e => onChange(e)}
                    ></textarea>
                </div>
                <button className="btn btn-primary" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddReview
