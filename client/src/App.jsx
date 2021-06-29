import React,{ useContext, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import RestaurantDetail from './routes/RestaurantDetail';
import Home from './routes/Home';
import UpdatePage from './routes/UpdatePage';
import Login from '../src/routes/Login'
import Register from '../src/routes/Register'
import { RestaurantContext } from './context/RestaurantsContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authBaseUrl from './API/authBaseUrl'

toast.configure();

function App() {

  const { isAuthenticated, setIsAuthenticated } = useContext(RestaurantContext)

  const checkIsAuth = async () => {
    try {
      const headers  = { token : localStorage.token }
      const response = await authBaseUrl.get("/is-verify", {headers})
      
      // const response = await fetch("http://localhost:3005/authenticate/is-verify", {
      //   method: "GET",
      //   headers : { token : localStorage.token },
      // })
      
      // console.log(response)
      // const parseResponse = await response.json()
      const parseResponse = response.data
  
      // console.log(parseResponse)
      parseResponse === true ? setIsAuthenticated(true) : setIsAuthenticated(false)
  
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    checkIsAuth()
  })



  return (
    <div className="container">
      <Router>
        <Switch>
          <Route
            exact
            path="/login"
            render = {props => !isAuthenticated ? <Login {...props} /> : <Redirect to="/" /> }
          />

          <Route
            exact
            path="/register"
            render = {props => !isAuthenticated ? <Register {...props} /> : <Redirect to="/login" /> }
          />

          <Route 
            exact 
            path="/" 
            render = {props => isAuthenticated ? <Home {...props} /> : <Redirect to="/login" /> } 
          />

          <Route 
            exact 
            path="/restaurants/:id/update"
            render = {props => isAuthenticated ? <UpdatePage {...props} /> : <Redirect to="/login" /> } 
          />

          <Route 
            exact 
            path="/restaurants/:id" 
            render = {props => isAuthenticated ? <RestaurantDetail {...props} /> : <Redirect to="/login" /> } 
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
