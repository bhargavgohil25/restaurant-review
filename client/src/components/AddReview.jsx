import React, { useContext, useState } from 'react'
import RangeSlider from 'react-bootstrap-range-slider';
import { Col } from 'react-bootstrap';
import restaurantFinder from '../API/restaurantFinder';
import { useParams } from 'react-router-dom';
import { RestaurantContext } from '../context/RestaurantsContext'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';


const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: "#037bfc",
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#037bfc',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'red',
            },
            '&:hover fieldset': {
                borderColor: '#037bfc',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#037bfc',
            },

        },

    },
})(TextField);

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "30ch"
    }
}));

const AddReview = () => {
    const classes = useStyles();

    const { id } = useParams()
    const { userId } = useContext(RestaurantContext)

    const [rating, setRating] = useState(0)

    const [inputs, setInputs] = useState({
        name: "",
        review: ""
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
            await restaurantFinder.post(`/${id}/addReview`, {
                name,
                review,
                rating,
                userid: userId.toString()
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
                        {/* <label htmlFor="name">Name</label> */}
                        {/* <input 
                            id="name" 
                            type="text" 
                            name="name"
                            value={name}
                            placeholder="name" 
                            className="form-control" 
                            onChange={e => onChange(e)}
                        /> */}
                        <CssTextField
                            type="text"
                            name="name"
                            id="name"
                            label="Name"
                            style={{width : '80%'}}
                            autoComplete="false"
                            className={classes.textField}
                            value={name}
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
                <div className="form-floating" style={{marginTop : "50px"}}>
                    <textarea
                        id="review"
                        className="form-control"
                        name="review"
                        placeholder="Review"
                        value={review}
                        onChange={e => onChange(e)}
                        style={{height: "100px"}}
                    ></textarea>
                    <label for="floatingTextarea">Add Review</label>
                </div>
                <button className="btn btn-primary" style={{marginTop : "20px"}} type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddReview
