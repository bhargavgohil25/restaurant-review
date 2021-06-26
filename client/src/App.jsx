import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import RestaurantDetail from './routes/RestaurantDetail';
import Home from './routes/Home';
import UpdatePage from './routes/UpdatePage';
import { RestaurantContextProvider } from './context/RestaurantsContext';

function App() {
  return (
    <RestaurantContextProvider>
      <div className="container">
        <Router>
          <Switch>
            <Route exact path="/" render={props => <Home {...props} />} />
            <Route exact path="/restaurants/:id/update" component={UpdatePage} />
            <Route exact path="/restaurants/:id" component={RestaurantDetail} />
          </Switch>
        </Router>
      </div>
    </RestaurantContextProvider>
  );
}

export default App;
