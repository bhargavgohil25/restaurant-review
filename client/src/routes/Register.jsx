import React, { Fragment, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { RestaurantContext } from '../context/RestaurantsContext'
import authBaseUrl from '../API/authBaseUrl'

const Register = () => {

    const { setAuth } = useContext(RestaurantContext)

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        name : ""
    });

    const { email , password, name } = inputs;

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name] : e.target.value})
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const body = { email, password, name }

            const headers = {  "Content-Type" : "application/json" }
            const response = await authBaseUrl.post("/register",body, headers )

            const parseResponse = response.data

            if(parseResponse.jwtToken){
                localStorage.setItem("token", parseResponse.jwtToken)
                setAuth(true) 
                toast.success('Registered Successfully')
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
                Register
            </h1>
            <div className="m-auto col-sm-6">
                <form onSubmit={e => onSubmit(e)}>
                    <input
                        type="email"
                        name="email"
                        placeholder="email"
                        className="form-control my-3"
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
                    <input
                        type="text"
                        name="name"
                        placeholder="name"
                        className="form-control my-3"
                        value={name}
                        onChange={e => onChange(e)}
                    />
                    <div className="d-grid gap-2 d-md-block">
                        <button
                            className="btn btn-success btn-block">
                            Submit
                        </button>
                    </div>
                </form>
                <Link to="/login">Login</Link>
            </div>

        </Fragment>
    )
}

export default Register
