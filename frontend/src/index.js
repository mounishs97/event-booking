import React from 'react';
import ReactDOM from 'react-dom';
import { Route} from 'react-browser-router';
import { BrowserRouter, Switch } from 'react-router-dom';
import ListEvent from './listEvents';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateBookingForm from './createBooking';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path="/booking/:id" component={CreateBookingForm} />
        <Route path="/" component={ListEvent} />
      </Switch >
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
