import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
// import 'bootstrap/dist/css/bootstrap.css'; // or include from a CDN
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import { RestaurantContextProvider } from './context/RestaurantsContext';


ReactDOM.render(
  <React.StrictMode>
    <RestaurantContextProvider>
      <App />
    </RestaurantContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
