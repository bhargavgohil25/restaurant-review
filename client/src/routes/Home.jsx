import React, { useContext, useEffect, useState } from 'react'
import AddRestaurant from '../components/AddRestaurant'
import Header from '../components/Header'
import RestaurantList from '../components/RestaurantList'
import { RestaurantContext } from '../context/RestaurantsContext'
import { toast } from 'react-toastify'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import SearchList from '../components/SearchList'
import { useDebounce } from 'use-debounce';
import Search from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';

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

const Home = () => {
    const classes = useStyles();

    const title = "Restaurant Finder";

    const { setAuth } = useContext(RestaurantContext)

    const [text, setText] = useState("")
    const [value] = useDebounce(text, 1000)

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
            <div class="row">
                <div class="col-md-11 col-sm-12">
                    <Header title={title} />
                </div>
                <div class="col-md-1 col-sm-12">
                    <button
                        style={{ marginTop: "35px" }}
                        className="btn btn-danger"
                        onClick={(e) => handleLogout(e)}
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
            <Grid container xs = {12} alignContent="center">
                <Grid container spacing={1} alignItems="flex-end" justify="center">
                    <Grid item>
                        <Search />
                    </Grid>
                    <Grid item>
                        <CssTextField
                            type="text"
                            name="Search"
                            id="search"
                            label="Search..."
                            className={classes.textField}
                            value={text}
                            onChange={e => setText(e.target.value)}
                            autoComplete="off"
                        />
                    </Grid>
                </Grid>
            </Grid>
            <div className="col-12" style={{ marginTop: "30px" }}>
                {value ? <SearchList value={value} /> : <RestaurantList />}
            </div>
        </div>
    )
}

export default Home

