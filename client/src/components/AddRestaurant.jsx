import React, { useContext, useState } from 'react'
import restaurantFinder from '../API/restaurantFinder'
import { RestaurantContext } from '../context/RestaurantsContext'
import RangeSlider from 'react-bootstrap-range-slider';
import { toast } from 'react-toastify';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { TextField} from '@material-ui/core';


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



const AddRestaurant = () => {
    const classes = useStyles();

    const { addRestaurants, userId } = useContext(RestaurantContext)
    const [range, setRange] = useState(1)

    const [inputs, setInputs] = useState({
        name: "",
        location: ""
    })

    const { name, location } = inputs

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    const emptyAllFields = () => {
        setInputs({ ...inputs, 'name': "", 'location': "" })
        setRange(1)
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await restaurantFinder.post("/", {
                name,
                location,
                price_range: range.toString(),
                userid : userId.toString()
            })

            // console.log(response)
            if (response.data !== "Invalid Information") {
                addRestaurants(response.data.data.restaurant)
                toast.success('Restaurant Added', {
                    draggable: true,
                })
            } else {
                toast.error(response.data)
            }
            emptyAllFields()
            // Todo: Toastify 
        } catch (err) {
            console.error(err.message)

        }
    }

    return (
        <div className="responsive gap-sm-10">
            <form
                action=""
                className="row"
                onSubmit={onSubmit}
                autoComplete="off"
            >
                <div className="col-md">
                    <CssTextField
                        type="text"
                        name="name"
                        id="name"
                        label="Name"
                        className={classes.textField}
                        value={name}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="col-md">
                    <CssTextField
                        type="text"
                        name="location"
                        id="location"
                        label="Location"
                        className={classes.textField}
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
