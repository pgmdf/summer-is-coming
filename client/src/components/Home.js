import React, { Component } from 'react';
import axios from 'axios'
import './../App.css';
import 'bootstrap/dist/css/bootstrap.css';

class Home extends Component {

    render(){
        return(
            <div>
            <h5>This will be the most amazing start page you have ever seen</h5>
            <img src="https://media.giphy.com/media/3oz8xZhRYHpK4qRMZ2/giphy.gif"/>
            <h4> Hello stranger</h4>

            </div>
        )
    }
}

export default Home;
