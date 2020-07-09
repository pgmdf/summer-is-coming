import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

// document.getElementById('root').innerText = 'The React app has not connected to the backend yet.'

axios.get('/api/checkuser').then(res => {
  ReactDOM.render(
    <Router><App user={res.data.userDoc} /></Router>, document.getElementById('root'));
})


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
