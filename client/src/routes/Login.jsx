import React, { Fragment, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import {toast} from 'react-toastify'
import { RestaurantContext } from '../context/RestaurantsContext'
import authBaseUrl from '../API/authBaseUrl'


const Login = () => {

    const { setAuth } = useContext(RestaurantContext)

    const [inputs, setInputs] = useState({
        email : "",
        password : "",
        name : ""
    });

    const { email,password } = inputs;

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        try {

            const body = { email, password }

            // with Fetch API
            const response = await fetch("http://localhost:3005/authenticate/login", {
                method : "POST",
                headers : { "Content-Type" : "application/json" },
                body : JSON.stringify(body)
            })  

            // with axios
            // const response = await authBaseUrl.post('/register',{
            //     body
            // });
            
            const parseResponse = await response.json()

            if(parseResponse.jwtToken){
                localStorage.setItem("token", parseResponse.jwtToken)
                setAuth(true)
                toast.success('Login Successfully', {
                    draggable : true,
                })
            }else{
                setAuth(false)
                toast.error(parseResponse)
            }

        } catch (err) {
            console.error(err.message)
        }
    }


    return (
        <Fragment>
            <h1 className="text-center my-5">
                Login
            </h1>
            <div className="m-auto col-sm-6">
                <form onSubmit = {onSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="email"
                        className="form-control my-3 "
                        value={email}
                        onChange={e => onChange(e)}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="form-control my-3"
                        value={password}
                        onChange={e => onChange(e)}
                    />
                    <div className="d-grid gap-2 d-md-block">
                        <button
                            className="btn btn-success btn-block">
                            Submit
                        </button>
                    </div>
                </form>
                <Link to="/register">Register</Link>
            </div>
        </Fragment>
    )
}

export default Login
