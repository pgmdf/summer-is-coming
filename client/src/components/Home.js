import React, { Component } from 'react';
import './../App.css';
import Slider from './Slider';

class Home extends Component {
  
    render(){
        // console.log("props",this.props.userInSession.username)
        return( 
            <div>
                <Slider />
                <h1>{this.props.userInSession ? 
                "Hello "+this.props.userInSession.username : "go away Stranger" }</h1>
            </div>
        )
    }
}

export default Home;